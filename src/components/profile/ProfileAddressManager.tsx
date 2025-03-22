
import React, { useState } from 'react';
import { ProfileAddressCard } from '@/components/profile/ProfileAddressCard';
import { useToast } from '@/hooks/use-toast';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { AddAddressForm } from '@/components/profile/AddAddressForm';
import {
  addAddressToProfile,
  removeAddress,
  UserProfile
} from '@/utils/firebaseUtils';

interface ProfileAddressManagerProps {
  userProfile: UserProfile | null;
  isLoading: boolean;
  onProfileUpdated: () => Promise<void>;
}

export const ProfileAddressManager: React.FC<ProfileAddressManagerProps> = ({
  userProfile,
  isLoading,
  onProfileUpdated
}) => {
  const { toast } = useToast();
  const [addressSheetOpen, setAddressSheetOpen] = useState(false);

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
        await onProfileUpdated();
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
        await onProfileUpdated();
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

  return (
    <>
      <ProfileAddressCard 
        addresses={userProfile?.addresses || []} 
        isLoading={isLoading} 
        onAddAddress={handleAddAddress}
        onRemoveAddress={handleRemoveAddress}
      />
      
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
    </>
  );
};
