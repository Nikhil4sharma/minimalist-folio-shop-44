
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
  UserProfile,
  Address
} from '@/utils/firebaseUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, PlusCircle } from 'lucide-react';

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
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressSheetOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
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
      // If we're editing, remove old address first
      if (editingAddress && editingAddress.id) {
        await removeAddress(userProfile.id, editingAddress.id);
      }
      
      const result = await addAddressToProfile(userProfile.id, address);
      
      if (result === true) {
        toast({
          title: editingAddress ? "Address updated" : "Address saved",
          description: editingAddress 
            ? "Your address has been updated successfully" 
            : "Your address has been saved successfully",
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

  const handleSetDefault = async (addressId: string) => {
    if (!userProfile || !userProfile.id) {
      toast({
        title: "Error updating address",
        description: "User profile not found",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Find the address to set as default
      const addressToUpdate = userProfile.addresses.find(addr => addr.id === addressId);
      if (!addressToUpdate) {
        throw new Error('Address not found');
      }
      
      // Remove the address first
      await removeAddress(userProfile.id, addressId);
      
      // Then add it back with isDefault set to true
      const updatedAddress = { ...addressToUpdate, isDefault: true };
      const result = await addAddressToProfile(userProfile.id, updatedAddress);
      
      if (result === true) {
        toast({
          title: "Default address updated",
          description: "Your default shipping address has been updated",
        });
        // Reload profile to get updated addresses
        await onProfileUpdated();
      } else if (typeof result === 'object' && 'error' in result) {
        toast({
          title: "Error updating address",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error setting default address:', error);
      toast({
        title: "Error updating address",
        description: "There was an error updating your address",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Addresses</CardTitle>
          <Button 
            onClick={handleAddAddress} 
            className="rounded-full bg-cyan hover:bg-cyan-light"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Address
          </Button>
        </CardHeader>
        <CardContent>
          <ProfileAddressCard 
            addresses={userProfile?.addresses || []} 
            isLoading={isLoading} 
            onAddAddress={handleAddAddress}
            onRemoveAddress={handleRemoveAddress}
            onEditAddress={handleEditAddress}
            onSetDefault={handleSetDefault}
          />
        </CardContent>
      </Card>
      
      <Sheet open={addressSheetOpen} onOpenChange={setAddressSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</SheetTitle>
            <SheetDescription>
              {editingAddress 
                ? 'Update your address details below' 
                : 'Enter your address details below'
              }
            </SheetDescription>
          </SheetHeader>
          <AddAddressForm 
            onSave={handleSaveAddress} 
            onCancel={() => setAddressSheetOpen(false)} 
            initialData={editingAddress || undefined}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
