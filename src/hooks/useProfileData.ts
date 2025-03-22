
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  getUserProfile,
  getOrders,
  UserProfile,
  Order,
  ErrorResponse
} from '@/utils/firebaseUtils';

export const useProfileData = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsRetrying(false);
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      // Check if we're online first
      if (!navigator.onLine) {
        setNetworkStatus('offline');
        setError('You are currently offline. Please check your internet connection and try again.');
        setIsLoading(false);
        return;
      }

      const profileData = await getUserProfile(currentUser.uid);
      
      // Check if there was an error
      if ('error' in profileData) {
        const errorData = profileData as ErrorResponse;
        setError(errorData.message || 'Error loading profile');
        
        // Show toast for network-related errors
        if (errorData.code === 'OFFLINE' || errorData.code === 'FIREBASE_UNAVAILABLE') {
          setNetworkStatus('offline');
        }
        
        setIsLoading(false);
        return;
      }
      
      setUserProfile(profileData as UserProfile);
      setIsLoading(false);
    } catch (error) {
      console.error('Error in profile page:', error);
      setError('Unable to load profile data. Please try again later.');
      setIsLoading(false);
    }
  }, [currentUser, navigate]);

  const fetchOrders = useCallback(async () => {
    if (!currentUser) return;
    
    setIsOrdersLoading(true);
    
    try {
      const userOrders = await getOrders(currentUser.uid);
      
      if ('error' in userOrders) {
        console.error('Error fetching orders:', userOrders.message);
        toast({
          title: "Couldn't load orders",
          description: userOrders.message,
          variant: "destructive",
        });
        setOrders([]);
      } else {
        setOrders(userOrders as Order[]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setIsOrdersLoading(false);
    }
  }, [currentUser, toast]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus('online');
      toast({
        title: "You're back online",
        description: "Reconnected to the network",
      });
    };
    
    const handleOffline = () => {
      setNetworkStatus('offline');
      toast({
        title: "You're offline",
        description: "Please check your internet connection",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  // Attempt to reload when coming back online
  useEffect(() => {
    if (networkStatus === 'online' && error && 
        (error.includes('offline') || error.includes('unavailable'))) {
      fetchUserProfile();
      fetchOrders();
    }
  }, [networkStatus, error, fetchUserProfile, fetchOrders]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (userProfile) {
      fetchOrders();
    }
  }, [userProfile, fetchOrders]);

  const handleRetry = () => {
    setIsRetrying(true);
    fetchUserProfile();
    fetchOrders();
  };

  return {
    currentUser,
    userProfile,
    orders,
    isLoading,
    isOrdersLoading,
    error,
    isRetrying,
    networkStatus,
    handleRetry,
    fetchUserProfile,
    fetchOrders
  };
};
