
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ShoppingBag, 
  Settings, 
  PlusCircle, 
  FileText, 
  Edit, 
  Trash, 
  LucideIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FeatureToggle {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

interface AdminSidebarItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

const AdminSidebarItem = ({ icon: Icon, label, active, onClick }: AdminSidebarItemProps) => (
  <div 
    className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
      active 
        ? 'bg-cyan text-white' 
        : 'hover:bg-gray-100 dark:hover:bg-navy-light'
    }`}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </div>
);

const Admin = () => {
  const { isAdmin, adminMode, toggleAdminMode } = useAdmin();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const [features, setFeatures] = useState<FeatureToggle[]>([
    { id: 'foiling', name: 'Foiling Feature', enabled: true, description: 'Enable foiling options for business cards' },
    { id: 'electroplating', name: 'Electroplating Feature', enabled: true, description: 'Enable electroplating options for business cards' },
    { id: 'embossing', name: 'Embossing Feature', enabled: true, description: 'Enable embossing options for business cards' },
    { id: 'edge_painting', name: 'Edge Painting', enabled: true, description: 'Enable edge painting options for business cards' },
    { id: 'custom_design', name: 'Custom Design Service', enabled: true, description: 'Enable designer assistance for custom designs' },
  ]);

  // If not admin, redirect to home
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const toggleFeature = (id: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ));
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-6">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2 bg-white dark:bg-navy-light rounded-lg border border-gray-200 dark:border-white/10 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-navy dark:text-white">Admin Panel</h2>
              <div className="flex items-center gap-2">
                <Switch
                  checked={adminMode}
                  onCheckedChange={toggleAdminMode}
                  id="admin-mode"
                />
                <Label htmlFor="admin-mode" className="text-xs">
                  Admin Mode
                </Label>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <AdminSidebarItem 
              icon={ShoppingBag} 
              label="Dashboard" 
              active={activeSection === 'dashboard'} 
              onClick={() => setActiveSection('dashboard')}
            />
            <AdminSidebarItem 
              icon={FileText} 
              label="Products" 
              active={activeSection === 'products'} 
              onClick={() => setActiveSection('products')}
            />
            <AdminSidebarItem 
              icon={Users} 
              label="Users" 
              active={activeSection === 'users'} 
              onClick={() => setActiveSection('users')}
            />
            <AdminSidebarItem 
              icon={Settings} 
              label="Settings" 
              active={activeSection === 'settings'} 
              onClick={() => setActiveSection('settings')}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-navy-light rounded-lg border border-gray-200 dark:border-white/10 p-4">
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-navy dark:text-white">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Users</CardTitle>
                      <CardDescription>Registered users in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-navy dark:text-white">124</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Orders</CardTitle>
                      <CardDescription>Order count in the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-navy dark:text-white">48</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Revenue</CardTitle>
                      <CardDescription>Total revenue this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-navy dark:text-white">₹32,450</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {activeSection === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-navy dark:text-white">Products</h1>
                  <Button className="rounded-full bg-cyan hover:bg-cyan-light text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-navy-dark">
                          <tr>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3">Base Price</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-navy-light dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              Standard Business Cards
                            </th>
                            <td className="px-6 py-4">₹999</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                            </td>
                            <td className="px-6 py-4 flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-navy-light dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              Foil Pressed Cards
                            </th>
                            <td className="px-6 py-4">₹1499</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                            </td>
                            <td className="px-6 py-4 flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="bg-white dark:bg-navy-light">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              Electroplated Cards
                            </th>
                            <td className="px-6 py-4">₹1999</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                            </td>
                            <td className="px-6 py-4 flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeSection === 'users' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-navy dark:text-white">Users</h1>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-navy-dark">
                          <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-navy-light dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              John Doe
                            </th>
                            <td className="px-6 py-4">john@example.com</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-cyan/20 text-cyan rounded-full text-xs">Admin</span>
                            </td>
                            <td className="px-6 py-4 flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-navy-light dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              Jane Smith
                            </th>
                            <td className="px-6 py-4">jane@example.com</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">User</span>
                            </td>
                            <td className="px-6 py-4 flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-navy dark:text-white">Settings</h1>
                
                <Tabs defaultValue="features">
                  <TabsList>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="website">Website</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="features" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Feature Toggles</CardTitle>
                        <CardDescription>Enable or disable features on your website</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {features.map(feature => (
                            <div key={feature.id} className="flex items-center justify-between">
                              <div>
                                <Label htmlFor={feature.id} className="font-medium">{feature.name}</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                              </div>
                              <Switch 
                                id={feature.id} 
                                checked={feature.enabled}
                                onCheckedChange={() => toggleFeature(feature.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="appearance" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Website Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of your website</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Theme Colors (Coming Soon)</Label>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                              <div className="w-10 h-10 rounded-full bg-cyan"></div>
                              <div className="w-10 h-10 rounded-full bg-violet-500"></div>
                              <div className="w-10 h-10 rounded-full bg-emerald-500"></div>
                              <div className="w-10 h-10 rounded-full bg-amber-500"></div>
                              <div className="w-10 h-10 rounded-full bg-rose-500"></div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <Label>Logo Settings (Coming Soon)</Label>
                            <div className="mt-2">
                              <Button variant="outline">Change Logo</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="website" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Website Settings</CardTitle>
                        <CardDescription>Manage your website's basic settings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Website Name (Coming Soon)</Label>
                            <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue="CardCraft" />
                          </div>
                          
                          <div>
                            <Label>Contact Email (Coming Soon)</Label>
                            <input type="email" className="w-full mt-1 p-2 border rounded-md" defaultValue="contact@cardcraft.com" />
                          </div>
                          
                          <div>
                            <Label>Phone Number (Coming Soon)</Label>
                            <input type="tel" className="w-full mt-1 p-2 border rounded-md" defaultValue="+91 9876543210" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
