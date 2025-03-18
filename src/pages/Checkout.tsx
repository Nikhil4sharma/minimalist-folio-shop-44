
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IndianRupee, CreditCard, Landmark, Truck, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { cartItems, subtotal, shipping, tax, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (Object.values(formData).some(value => value === '')) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Process order
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Your order has been received.",
    });
    
    // Clear cart and redirect
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
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
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="bg-gray-50 dark:bg-navy-light p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
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
                  </div>
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
      
      <Footer />
    </div>
  );
};

export default Checkout;
