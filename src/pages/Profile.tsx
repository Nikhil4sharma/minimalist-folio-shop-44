
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Package, ShoppingBag, CreditCard, Settings, LogOut, IndianRupee, Mail, Phone, MapPin, Edit, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123 Park Street, Mumbai, Maharashtra, 400001"
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Mock order history data
  const orders = [
    { id: "ORD-12345", date: "2023-05-15", status: "Delivered", amount: 1499 },
    { id: "ORD-12346", date: "2023-06-10", status: "Processing", amount: 2199 },
    { id: "ORD-12347", date: "2023-07-03", status: "Shipped", amount: 999 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-navy">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/4 space-y-6">
              <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
                <CardHeader className="flex flex-row items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/avatar-placeholder.png" alt="Profile" />
                    <AvatarFallback className="bg-cyan text-white text-xl">{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-navy dark:text-white">{userInfo.name}</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">{userInfo.email}</CardDescription>
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
                    <Button variant="ghost" className="justify-start text-red-500">
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
            
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="designs">Saved Designs</TabsTrigger>
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
                        <Button onClick={handleSave} className="gap-2 bg-cyan hover:bg-cyan-light">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                          {editing ? (
                            <Input 
                              name="name" 
                              value={userInfo.name} 
                              onChange={handleChange} 
                              className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark"
                            />
                          ) : (
                            <p className="text-navy dark:text-white flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              {userInfo.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                          {editing ? (
                            <Input 
                              name="email" 
                              value={userInfo.email} 
                              onChange={handleChange} 
                              className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark"
                            />
                          ) : (
                            <p className="text-navy dark:text-white flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {userInfo.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                          {editing ? (
                            <Input 
                              name="phone" 
                              value={userInfo.phone} 
                              onChange={handleChange} 
                              className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark"
                            />
                          ) : (
                            <p className="text-navy dark:text-white flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {userInfo.phone}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                          {editing ? (
                            <Input 
                              name="address" 
                              value={userInfo.address} 
                              onChange={handleChange} 
                              className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark"
                            />
                          ) : (
                            <p className="text-navy dark:text-white flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {userInfo.address}
                            </p>
                          )}
                        </div>
                      </div>
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
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="p-4 border rounded-lg dark:border-white/10 flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                              <p className="font-medium text-navy dark:text-white">{order.id}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge className={
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                                'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
                              }>
                                {order.status}
                              </Badge>
                              <p className="font-medium text-navy dark:text-white flex items-center">
                                <IndianRupee className="h-3 w-3 mr-1" />
                                {order.amount.toLocaleString('en-IN')}
                              </p>
                              <Button variant="ghost" size="sm" className="text-cyan">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="designs">
                  <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
                    <CardHeader>
                      <CardTitle className="text-navy dark:text-white">Saved Designs</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">Access your custom card designs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((design) => (
                          <div key={design} className="border rounded-lg dark:border-white/10 overflow-hidden">
                            <div className="aspect-video bg-gray-100 dark:bg-navy-dark flex items-center justify-center">
                              <p className="text-gray-400">Design Preview</p>
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-navy dark:text-white">Design #{design}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Created on: 2023-0{design}-01</p>
                              <div className="flex justify-between mt-3">
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button size="sm" className="bg-cyan hover:bg-cyan-light">Order</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
