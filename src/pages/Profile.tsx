
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Package, ShoppingBag, CreditCard, Settings, LogOut, IndianRupee, Mail, Phone, MapPin, Edit, Save, Plus, Trash } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, createUserProfile, getOrders } from '@/utils/firebaseUtils';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define interface for user profile data
interface UserProfile {
  id?: string;
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  addresses?: Array<{
    id: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault?: boolean;
  }>;
}

// Define interface for order data
interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: any; // Firebase timestamp
  items?: any[];
}

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
});

const addressSchema = z.object({
  street: z.string().min(5, { message: "Street address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  pincode: z.string().min(6, { message: "Pincode must be at least 6 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  isDefault: z.boolean().default(false),
});

const Profile = () => {
  const { toast } = useToast();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      isDefault: false,
    },
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const profileData = await getUserProfile(currentUser.uid);
        
        if (profileData) {
          // Properly cast the profileData to UserProfile type
          const profile = profileData as UserProfile;
          setUserProfile(profile);
          setProfileId(profile.id || null);
          
          profileForm.reset({
            name: profile.name || currentUser.displayName || '',
            email: profile.email || currentUser.email || '',
            phone: profile.phone || '',
          });
          
          if (profile.addresses && Array.isArray(profile.addresses)) {
            setAddresses(profile.addresses);
          }
        } else {
          const name = currentUser.displayName || '';
          const email = currentUser.email || '';
          
          const newProfile = {
            name,
            email,
            userId: currentUser.uid,
          };
          
          await createUserProfile(currentUser.uid, newProfile);
          const createdProfileData = await getUserProfile(currentUser.uid);
          
          if (createdProfileData) {
            const createdProfile = createdProfileData as UserProfile;
            setUserProfile(createdProfile);
            setProfileId(createdProfile.id || null);
            
            profileForm.reset({
              name,
              email,
              phone: '',
            });
          }
        }
        
        const userOrders = await getOrders(currentUser.uid);
        setOrders(userOrders as Order[]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (data: z.infer<typeof profileSchema>) => {
    if (!profileId || !currentUser) return;
    
    try {
      await updateUserProfile(profileId, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        addresses: addresses,
      });
      
      setUserProfile({
        ...userProfile,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      
      setEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAddAddress = async (data: z.infer<typeof addressSchema>) => {
    if (!profileId || !currentUser) return;
    
    try {
      const updatedAddresses = editingAddress
        ? addresses.map(addr => addr.id === editingAddress.id ? { ...data, id: editingAddress.id } : addr)
        : [...addresses, { ...data, id: Date.now().toString() }];
      
      if (data.isDefault) {
        updatedAddresses.forEach(addr => {
          if (addr.id !== (editingAddress?.id || Date.now().toString())) {
            addr.isDefault = false;
          }
        });
      }
      
      await updateUserProfile(profileId, {
        addresses: updatedAddresses,
      });
      
      setAddresses(updatedAddresses);
      setAddressDialogOpen(false);
      setEditingAddress(null);
      
      addressForm.reset({
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        isDefault: false,
      });
      
      toast({
        title: editingAddress ? "Address updated" : "Address added",
        description: editingAddress
          ? "Your address has been updated successfully."
          : "Your new address has been added successfully.",
      });
    } catch (error) {
      console.error('Error updating addresses:', error);
      toast({
        title: 'Error',
        description: 'Failed to save address. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    addressForm.reset({
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country || 'India',
      isDefault: address.isDefault || false,
    });
    setAddressDialogOpen(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!profileId || !currentUser) return;
    
    try {
      const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
      
      await updateUserProfile(profileId, {
        addresses: updatedAddresses,
      });
      
      setAddresses(updatedAddresses);
      
      toast({
        title: "Address deleted",
        description: "Your address has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete address. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    addressForm.reset({
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      isDefault: false,
    });
    setAddressDialogOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy">
        <Navbar />
        <div className="pt-28 pb-12 px-4 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan mx-auto"></div>
            <p className="mt-4 text-navy dark:text-white">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4 space-y-6">
              <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
                <CardHeader className="flex flex-row items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentUser?.photoURL || ""} alt="Profile" />
                    <AvatarFallback className="bg-cyan text-white text-xl">
                      {userProfile?.name ? userProfile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 
                      currentUser?.displayName ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : 
                      currentUser?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-navy dark:text-white">
                      {userProfile?.name || currentUser?.displayName || 'User'}
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      {userProfile?.email || currentUser?.email}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <nav className="flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start text-navy dark:text-white">
                      <User className="mr-2 h-5 w-5" /> Profile
                    </Button>
                    <Button variant="ghost" className="justify-start text-navy dark:text-white">
                      <ShoppingBag className="mr-2 h-5 w-5" /> Orders
                    </Button>
                    <Button variant="ghost" className="justify-start text-navy dark:text-white">
                      <Package className="mr-2 h-5 w-5" /> Saved Designs
                    </Button>
                    <Button variant="ghost" className="justify-start text-navy dark:text-white">
                      <CreditCard className="mr-2 h-5 w-5" /> Payment Methods
                    </Button>
                    <Button variant="ghost" className="justify-start text-navy dark:text-white">
                      <Settings className="mr-2 h-5 w-5" /> Settings
                    </Button>
                    <Separator className="my-2 bg-gray-200 dark:bg-white/10" />
                    <Button variant="ghost" className="justify-start text-red-500" onClick={handleLogout}>
                      <LogOut className="mr-2 h-5 w-5" /> Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>

              <Card className="bg-cyan text-white">
                <CardHeader>
                  <CardTitle>Premium Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Upgrade to Premium for exclusive discounts and priority support.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-cyan hover:bg-gray-100">Upgrade Now</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="w-full md:w-3/4">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-navy dark:text-white">Personal Information</CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-400">Manage your personal details</CardDescription>
                      </div>
                      {!editing ? (
                        <Button variant="outline" onClick={handleEdit} className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Profile
                        </Button>
                      ) : (
                        <Button 
                          onClick={profileForm.handleSubmit(handleSave)} 
                          className="gap-2 bg-cyan hover:bg-cyan-light"
                        >
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {editing ? (
                        <Form {...profileForm}>
                          <form className="space-y-4">
                            <FormField
                              control={profileForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Your full name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Your email address" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={profileForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Your phone number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <p className="text-navy dark:text-white flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              {userProfile?.name || currentUser?.displayName || 'Not provided'}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <p className="text-navy dark:text-white flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {userProfile?.email || currentUser?.email}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                            <p className="text-navy dark:text-white flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {userProfile?.phone || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
                    <CardHeader>
                      <CardTitle className="text-navy dark:text-white">Order History</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">View and track your orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div 
                              key={order.id} 
                              className="p-4 border rounded-lg dark:border-white/10 flex flex-col sm:flex-row justify-between gap-4"
                            >
                              <div>
                                <p className="font-medium text-navy dark:text-white">{order.id}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {order.createdAt?.toDate ? 
                                    new Date(order.createdAt.toDate()).toLocaleDateString() : 
                                    'Date not available'}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge className={
                                  order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                  order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                                  order.status === 'shipped' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' :
                                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                                }>
                                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                                </Badge>
                                <p className="font-medium text-navy dark:text-white flex items-center">
                                  <IndianRupee className="h-3 w-3 mr-1" />
                                  {order.totalAmount ? order.totalAmount.toLocaleString('en-IN') : 'N/A'}
                                </p>
                                <Button variant="ghost" size="sm" className="text-cyan">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <ShoppingBag className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                          <h3 className="text-lg font-medium text-navy dark:text-white">No orders yet</h3>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            You haven't placed any orders yet.
                          </p>
                          <Button className="mt-4 bg-cyan hover:bg-cyan-light" onClick={() => navigate('/products')}>
                            Browse Products
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="addresses">
                  <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-navy dark:text-white">Saved Addresses</CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-400">
                          Manage your shipping addresses
                        </CardDescription>
                      </div>
                      <Button onClick={handleAddNewAddress} className="gap-2 bg-cyan hover:bg-cyan-light text-white">
                        <Plus className="h-4 w-4" />
                        Add New Address
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {addresses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {addresses.map((address) => (
                            <div key={address.id} className="border rounded-lg p-4 dark:border-white/10 relative">
                              {address.isDefault && (
                                <Badge className="absolute top-2 right-2 bg-cyan text-white">
                                  Default
                                </Badge>
                              )}
                              <div className="flex items-start mb-2">
                                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                                <div>
                                  <p className="font-medium text-navy dark:text-white">{address.street}</p>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {address.city}, {address.state}, {address.pincode}
                                  </p>
                                  <p className="text-gray-600 dark:text-gray-300">{address.country}</p>
                                </div>
                              </div>
                              <div className="flex space-x-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-cyan border-cyan hover:bg-cyan/10"
                                  onClick={() => handleEditAddress(address)}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 border-red-500 hover:bg-red-500/10"
                                  onClick={() => handleDeleteAddress(address.id)}
                                >
                                  <Trash className="h-3 w-3 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <MapPin className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                          <h3 className="text-lg font-medium text-navy dark:text-white">No addresses saved</h3>
                          <p className="text-gray-500 dark:text-gray-400 mt-1">
                            You haven't saved any addresses yet.
                          </p>
                          <Button className="mt-4 bg-cyan hover:bg-cyan-light" onClick={handleAddNewAddress}>
                            Add Address
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          </DialogHeader>
          <Form {...addressForm}>
            <form onSubmit={addressForm.handleSubmit(handleAddAddress)} className="space-y-4">
              <FormField
                control={addressForm.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Enter your street address" 
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={addressForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addressForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="State" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={addressForm.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Pincode" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addressForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Country" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={addressForm.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          id="isDefault"
                          className="h-4 w-4 rounded border-gray-300 text-cyan focus:ring-cyan"
                        />
                        <label
                          htmlFor="isDefault"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Set as default address
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setAddressDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-cyan hover:bg-cyan-light">
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Profile;
