
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getUserProfile, getOrders } from '@/utils/firebaseUtils';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileAddressCard } from '@/components/profile/ProfileAddressCard';
import { ProfileOrdersCard } from '@/components/profile/ProfileOrdersCard';
import { ProfileError } from '@/components/profile/ProfileError';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    
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
      if (profileData && typeof profileData === 'object' && 'error' in profileData) {
        const errorData = profileData as { error: boolean, message?: string };
        setError(errorData.message || 'Error loading profile');
        setIsLoading(false);
        return;
      }
      
      setUserProfile(profileData);
      
      // Fetch orders
      const userOrders = await getOrders(currentUser.uid);
      setOrders(userOrders || []);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error in profile page:', error);
      setError('Unable to load profile data. Please try again later.');
      setIsLoading(false);
    }
  };

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Attempt to reload when coming back online
  useEffect(() => {
    if (networkStatus === 'online' && error && error.includes('offline')) {
      fetchUserProfile();
    }
  }, [networkStatus]);

  useEffect(() => {
    fetchUserProfile();
  }, [currentUser]);

  const handleAddAddress = () => {
    // This would open an address form
    console.log('Add address functionality to be implemented');
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  // Show error state
  if (error && !isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy">
        <Navbar />
        <div className="container mx-auto px-4 py-28">
          <ProfileError message={error} onRetry={fetchUserProfile} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-28">
        <ProfileHeader 
          name={userProfile?.name || ''} 
          email={userProfile?.email || currentUser?.email || ''} 
          isLoading={isLoading} 
        />

        <Tabs defaultValue="orders" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="addresses">My Addresses</TabsTrigger>
            <TabsTrigger value="designs">Saved Designs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <ProfileOrdersCard orders={orders} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="addresses">
            <ProfileAddressCard 
              addresses={userProfile?.addresses || []} 
              isLoading={isLoading} 
              onAddAddress={handleAddAddress} 
            />
          </TabsContent>
          
          <TabsContent value="designs">
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                You don't have any saved designs yet.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          <p>Need help? Contact our support team at support@chapai.com</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
