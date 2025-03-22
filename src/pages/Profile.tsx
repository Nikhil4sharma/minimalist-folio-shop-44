
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  getUserProfile, 
  getOrders, 
  addAddressToProfile, 
  removeAddress,
  UserProfile as UserProfileType,
  ErrorResponse,
  Order
} from '@/utils/firebaseUtils';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileAddressCard } from '@/components/profile/ProfileAddressCard';
import { ProfileOrdersCard } from '@/components/profile/ProfileOrdersCard';
import { ProfileError } from '@/components/profile/ProfileError';
import { ProfileSavedDesigns } from '@/components/profile/ProfileSavedDesigns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { AddAddressForm } from '@/components/profile/AddAddressForm';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [isRetrying, setIsRetrying] = useState(false);
  const [addressSheetOpen, setAddressSheetOpen] = useState(false);

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
      
      setUserProfile(profileData as UserProfileType);
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

  const handleAddAddress = () => {
    setAddressSheetOpen(true);
  };

  const handleSaveAddress = async (address: any) => {
    if (!userProfile || !userProfile.id) {
      toast({
        title: "Error saving address",
        description: "User profile not found",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await addAddressToProfile(userProfile.id, address);
      
      if (result === true) {
        toast({
          title: "Address saved",
          description: "Your address has been saved successfully",
        });
        setAddressSheetOpen(false);
        // Reload profile to get updated addresses
        await fetchUserProfile();
      } else if (typeof result === 'object' && 'error' in result) {
        toast({
          title: "Error saving address",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error saving address",
        description: "There was an error saving your address",
        variant: "destructive",
      });
    }
  };

  const handleRemoveAddress = async (addressId: string) => {
    if (!userProfile || !userProfile.id) {
      toast({
        title: "Error removing address",
        description: "User profile not found",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await removeAddress(userProfile.id, addressId);
      
      if (result === true) {
        toast({
          title: "Address removed",
          description: "Your address has been removed successfully",
        });
        // Reload profile to get updated addresses
        await fetchUserProfile();
      } else if (typeof result === 'object' && 'error' in result) {
        toast({
          title: "Error removing address",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error removing address:', error);
      toast({
        title: "Error removing address",
        description: "There was an error removing your address",
        variant: "destructive",
      });
    }
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
          <ProfileError message={error} onRetry={handleRetry} isRetrying={isRetrying} />
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
            <ProfileOrdersCard 
              orders={orders} 
              isLoading={isOrdersLoading} 
            />
          </TabsContent>
          
          <TabsContent value="addresses">
            <ProfileAddressCard 
              addresses={userProfile?.addresses || []} 
              isLoading={isLoading} 
              onAddAddress={handleAddAddress}
              onRemoveAddress={handleRemoveAddress}
            />
          </TabsContent>
          
          <TabsContent value="designs">
            <ProfileSavedDesigns userId={currentUser.uid} />
          </TabsContent>
        </Tabs>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          <p>Need help? Contact our support team at support@chapai.com</p>
        </div>
      </div>
      
      <Sheet open={addressSheetOpen} onOpenChange={setAddressSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Address</SheetTitle>
            <SheetDescription>
              Enter your address details below
            </SheetDescription>
          </SheetHeader>
          <AddAddressForm onSave={handleSaveAddress} onCancel={() => setAddressSheetOpen(false)} />
        </SheetContent>
      </Sheet>
      
      <Footer />
    </div>
  );
};

export default Profile;
