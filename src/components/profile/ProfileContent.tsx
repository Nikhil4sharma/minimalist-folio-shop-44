
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileOrdersCard } from '@/components/profile/ProfileOrdersCard';
import { ProfileSavedDesigns } from '@/components/profile/ProfileSavedDesigns';
import { ProfileAddressManager } from '@/components/profile/ProfileAddressManager';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { UserProfile, Order } from '@/utils/firebaseUtils';

interface ProfileContentProps {
  userProfile: UserProfile | null;
  orders: Order[];
  currentUser: any;
  isLoading: boolean;
  isOrdersLoading: boolean;
  onProfileUpdated: () => Promise<void>;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  userProfile,
  orders,
  currentUser,
  isLoading,
  isOrdersLoading,
  onProfileUpdated
}) => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="container mx-auto px-4 py-28">
      <ProfileHeader 
        name={userProfile?.name || currentUser?.displayName || ''} 
        email={userProfile?.email || currentUser?.email || ''} 
        isLoading={isLoading} 
      />

      <Tabs defaultValue="orders" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="profile">Edit Profile</TabsTrigger>
          <TabsTrigger value="addresses">My Addresses</TabsTrigger>
          <TabsTrigger value="designs">Saved Designs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <ProfileOrdersCard 
            orders={orders} 
            isLoading={isOrdersLoading} 
          />
        </TabsContent>
        
        <TabsContent value="profile">
          <ProfileEditForm 
            userProfile={userProfile}
            currentUser={currentUser}
            isLoading={isLoading}
            onProfileUpdated={onProfileUpdated}
          />
        </TabsContent>
        
        <TabsContent value="addresses">
          <ProfileAddressManager
            userProfile={userProfile}
            isLoading={isLoading}
            onProfileUpdated={onProfileUpdated}
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
  );
};
