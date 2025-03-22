
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/ThemeProvider';
import { PlusCircle, MapPin, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Address {
  id?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}

interface ProfileAddressCardProps {
  addresses: Address[];
  isLoading: boolean;
  onAddAddress: () => void;
  onRemoveAddress?: (addressId: string) => void;
}

export const ProfileAddressCard: React.FC<ProfileAddressCardProps> = ({ 
  addresses, 
  isLoading,
  onAddAddress,
  onRemoveAddress
}) => {
  const { theme } = useTheme();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <p>Loading addresses...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              You haven't added any addresses yet.
            </p>
            <Button 
              onClick={onAddAddress}
              className="rounded-full bg-cyan hover:bg-cyan-light flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div 
                key={address.id || index}
                className={`p-4 rounded-lg border ${
                  theme === 'light' 
                    ? 'border-gray-200 bg-gray-50' 
                    : 'border-gray-700 bg-navy-light'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 mt-0.5 text-cyan" />
                    <div>
                      <p className="font-medium">
                        {address.line1}
                        {address.line2 && <span>, {address.line2}</span>}
                      </p>
                      <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      {address.isDefault && (
                        <Badge variant="outline" className="mt-2 bg-cyan/10 text-cyan border-cyan">
                          Default Address
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {onRemoveAddress && address.id && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Address</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this address? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onRemoveAddress(address.id as string)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))}
            <Button 
              onClick={onAddAddress}
              variant="outline" 
              className="w-full mt-4 rounded-full border-cyan text-cyan"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Another Address
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
