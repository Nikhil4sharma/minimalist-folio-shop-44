
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile, UserProfile } from '@/utils/firebaseUtils';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  userProfile: UserProfile | null;
  currentUser: any;
  isLoading: boolean;
  onProfileUpdated: () => Promise<void>;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ 
  userProfile, 
  currentUser,
  isLoading,
  onProfileUpdated
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name || currentUser?.displayName || '',
      email: userProfile?.email || currentUser?.email || '',
      phone: userProfile?.phone || '',
    },
  });
  
  // Update form values when profile data loads
  React.useEffect(() => {
    if (userProfile && !isLoading) {
      form.reset({
        name: userProfile.name || currentUser?.displayName || '',
        email: userProfile.email || currentUser?.email || '',
        phone: userProfile.phone || '',
      });
    }
  }, [userProfile, isLoading, currentUser, form]);
  
  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      if (!userProfile || !userProfile.id) {
        toast({
          title: "Error updating profile",
          description: "Profile not found",
          variant: "destructive",
        });
        return;
      }
      
      const result = await updateUserProfile(userProfile.id, values);
      
      if (result === true) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
        
        // Reload profile to get updated data
        await onProfileUpdated();
      } else if (typeof result === 'object' && 'error' in result) {
        toast({
          title: "Error updating profile",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "There was an error updating your profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <p>Loading profile data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your email" 
                      type="email" 
                      {...field} 
                      disabled={currentUser?.email === field.value}
                    />
                  </FormControl>
                  {currentUser?.email === field.value && (
                    <p className="text-xs text-muted-foreground">
                      Email is managed by your authentication provider and cannot be changed here.
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="rounded-full bg-cyan hover:bg-cyan-light"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
