
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  IndianRupee, 
  CreditCard, 
  Landmark, 
  Truck, 
  ChevronRight, 
  ShoppingBag,
  PlusCircle,
  MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, addAddressToProfile, Address, createOrder } from '@/utils/firebaseUtils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AddAddressForm } from '@/components/profile/AddAddressForm';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';

const Checkout = () => {
  const { cartItems, subtotal, shipping, tax, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [addressSheetOpen, setAddressSheetOpen] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);
  
  // Form state for new address
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  // Fetch user addresses if logged in
  useEffect(() => {
    const fetchUserAddresses = async () => {
      if (currentUser) {
        setLoadingAddresses(true);
        try {
          const profileData = await getUserProfile(currentUser.uid);
          
          if ('error' in profileData) {
            console.error('Error fetching user profile:', profileData.message);
          } else {
            setAddresses(profileData.addresses || []);
            
            // Auto-select default address if available
            const defaultAddress = profileData.addresses?.find(addr => addr.isDefault);
            if (defaultAddress && defaultAddress.id) {
              setSelectedAddressId(defaultAddress.id);
            }
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        } finally {
          setLoadingAddresses(false);
        }
      }
    };
    
    fetchUserAddresses();
  }, [currentUser]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has selected a saved address or filled in the form
    if (!selectedAddressId && Object.values(formData).some(value => value === '')) {
      toast({
        title: "Error",
        description: "Please select an address or fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      let shippingAddress: any;
      
      // If user selected a saved address
      if (selectedAddressId) {
        const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
        if (!selectedAddress) {
          throw new Error('Selected address not found');
        }
        shippingAddress = selectedAddress;
      } else {
        // Using the new address from the form
        shippingAddress = {
          line1: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.pincode,
        };
        
        // Save address to profile if user is logged in and opted to save
        if (currentUser && saveAddress) {
          const profileData = await getUserProfile(currentUser.uid);
          
          if (!('error' in profileData) && profileData.id) {
            await addAddressToProfile(profileData.id, shippingAddress);
          }
        }
      }
      
      // Create order data
      const orderData = {
        items: cartItems,
        total: total,
        status: 'pending',
        shippingAddress,
        paymentMethod,
      };
      
      // If user is logged in, create order in database
      if (currentUser) {
        const result = await createOrder(currentUser.uid, orderData);
        
        if (!result.success) {
          throw new Error(result.error?.message || 'Failed to create order');
        }
      }
      
      // Show success message
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order has been received.",
      });
      
      // Clear cart and redirect
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process your order",
        variant: "destructive",
      });
    }
  };
  
  const handleAddAddress = () => {
    setAddressSheetOpen(true);
  };
  
  const handleSaveAddress = async (address: any) => {
    if (!currentUser) {
      toast({
        title: "Error saving address",
        description: "Please log in to save addresses",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const profileData = await getUserProfile(currentUser.uid);
      
      if ('error' in profileData) {
        throw new Error(profileData.message);
      }
      
      if (!profileData.id) {
        throw new Error('Profile not found');
      }
      
      const result = await addAddressToProfile(profileData.id, address);
      
      if (result === true) {
        toast({
          title: "Address saved",
          description: "Your address has been saved successfully",
        });
        setAddressSheetOpen(false);
        
        // Refresh addresses
        const updatedProfile = await getUserProfile(currentUser.uid);
        if (!('error' in updatedProfile)) {
          setAddresses(updatedProfile.addresses || []);
          
          // Auto-select the newly added address
          const newAddress = updatedProfile.addresses.find(addr => 
            addr.line1 === address.line1 && addr.postalCode === address.postalCode
          );
          
          if (newAddress && newAddress.id) {
            setSelectedAddressId(newAddress.id);
          }
        }
      } else if (typeof result === 'object' && 'error' in result) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error saving address",
        description: error instanceof Error ? error.message : "There was an error saving your address",
        variant: "destructive",
      });
    }
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
        <Navbar />
        
        <div className="pt-28 pb-20 px-4">
          <div className="container mx-auto text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-300 mb-8">You need to add items to your cart before checkout</p>
            <Link to="/products">
              <Button className="rounded-full bg-cyan hover:bg-cyan-light">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="w-full lg:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-gray-50 dark:bg-navy-light p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="bg-white dark:bg-navy-dark"
                        disabled={!!selectedAddressId}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white dark:bg-navy-dark"
                        disabled={!!selectedAddressId}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white dark:bg-navy-dark"
                        disabled={!!selectedAddressId}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="bg-gray-50 dark:bg-navy-light p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                    
                    {currentUser && (
                      <Button 
                        type="button" 
                        variant="outline"
                        className="rounded-full"
                        onClick={handleAddAddress}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Address
                      </Button>
                    )}
                  </div>
                  
                  {/* Saved addresses */}
                  {currentUser && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-3">Your Saved Addresses</h3>
                      
                      {loadingAddresses ? (
                        <div className="space-y-3">
                          <Skeleton className="h-20 w-full rounded-lg" />
                          <Skeleton className="h-20 w-full rounded-lg" />
                        </div>
                      ) : addresses.length > 0 ? (
                        <div className="space-y-3 mb-6">
                          <RadioGroup 
                            value={selectedAddressId || ''} 
                            onValueChange={(value) => {
                              setSelectedAddressId(value);
                              if (value === '') {
                                setFormData({
                                  fullName: '',
                                  email: '',
                                  phone: '',
                                  address: '',
                                  city: '',
                                  state: '',
                                  pincode: '',
                                });
                              }
                            }}
                          >
                            {addresses.map((address) => (
                              <div 
                                key={address.id}
                                className="flex items-start space-x-3 border rounded-lg p-4 bg-white dark:bg-navy-dark"
                              >
                                <RadioGroupItem value={address.id || ''} id={`address-${address.id}`} className="mt-1" />
                                <Label htmlFor={`address-${address.id}`} className="cursor-pointer flex-1">
                                  <div className="flex items-start gap-2">
                                    <MapPin className="h-5 w-5 mt-0.5 text-cyan flex-shrink-0" />
                                    <div>
                                      <p className="font-medium">
                                        {address.line1}
                                        {address.line2 && <span>, {address.line2}</span>}
                                      </p>
                                      <p className="text-gray-600 dark:text-gray-300">
                                        {address.city}, {address.state} {address.postalCode}
                                      </p>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            ))}
                            
                            <div 
                              className="flex items-start space-x-3 border rounded-lg p-4 bg-white dark:bg-navy-dark"
                            >
                              <RadioGroupItem value="" id="address-new" className="mt-1" />
                              <Label htmlFor="address-new" className="cursor-pointer flex-1">
                                <div className="flex items-start gap-2">
                                  <PlusCircle className="h-5 w-5 mt-0.5 text-cyan flex-shrink-0" />
                                  <div>
                                    <p className="font-medium">Use a different address</p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                      Fill in the address form below
                                    </p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          You don't have any saved addresses yet. Add one now or fill in the form below.
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Manual address form - show when no address is selected */}
                  {!selectedAddressId && (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="123 Main St, Apt 4B"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="bg-white dark:bg-navy-dark"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            placeholder="Mumbai"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="bg-white dark:bg-navy-dark"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            placeholder="Maharashtra"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="bg-white dark:bg-navy-dark"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            placeholder="400001"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="bg-white dark:bg-navy-dark"
                          />
                        </div>
                      </div>
                      
                      {currentUser && (
                        <div className="flex items-center space-x-2 mt-2">
                          <input
                            type="checkbox"
                            id="saveAddress"
                            checked={saveAddress}
                            onChange={(e) => setSaveAddress(e.target.checked)}
                            className="rounded border-gray-300 text-cyan focus:ring-cyan"
                          />
                          <Label htmlFor="saveAddress" className="text-sm font-normal cursor-pointer">
                            Save this address to my profile
                          </Label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Payment Method */}
                <div className="bg-gray-50 dark:bg-navy-light p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-center space-x-2 bg-white dark:bg-navy-dark p-4 rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                        <div className="bg-cyan/10 p-2 rounded-full">
                          <IndianRupee className="h-5 w-5 text-cyan" />
                        </div>
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pay using Google Pay, PhonePe, Paytm, etc.</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white dark:bg-navy-dark p-4 rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <div className="bg-cyan/10 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-cyan" />
                        </div>
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pay using Visa, Mastercard, RuPay</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white dark:bg-navy-dark p-4 rounded-lg">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer">
                        <div className="bg-cyan/10 p-2 rounded-full">
                          <Landmark className="h-5 w-5 text-cyan" />
                        </div>
                        <div>
                          <p className="font-medium">Net Banking</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pay using your bank account</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white dark:bg-navy-dark p-4 rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                        <div className="bg-cyan/10 p-2 rounded-full">
                          <Truck className="h-5 w-5 text-cyan" />
                        </div>
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pay when you receive your order</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full md:w-auto rounded-full bg-cyan hover:bg-cyan-light py-6 text-lg">
                  Place Order <ChevronRight className="ml-2" />
                </Button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-gray-50 dark:bg-navy-light p-6 rounded-xl sticky top-28">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="divide-y divide-gray-200 dark:divide-white/10">
                  {/* Items */}
                  <div className="space-y-4 pb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between gap-4">
                        <div className="flex gap-2">
                          <div className="w-16 h-12 bg-gray-200 dark:bg-navy-dark rounded flex items-center justify-center text-xs">
                            Card
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium flex items-center">
                          <IndianRupee className="h-3 w-3" />
                          {item.totalPrice.toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pricing */}
                  <div className="py-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                      <span className="flex items-center">
                        <IndianRupee className="h-3 w-3" />
                        {subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                      <span className="flex items-center">
                        <IndianRupee className="h-3 w-3" />
                        {shipping.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">GST (18%)</span>
                      <span className="flex items-center">
                        <IndianRupee className="h-3 w-3" />
                        {tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/cart">
                    <Button variant="outline" className="w-full rounded-full">
                      Back to Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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

export default Checkout;
