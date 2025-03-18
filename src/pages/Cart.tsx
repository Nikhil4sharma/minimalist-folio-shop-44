
import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  // Sample cart data - in a real app this would come from state management
  const cartItems = [
    {
      id: '1',
      name: 'Classic Foil Business Card',
      quantity: 250,
      gsm: '350',
      price: 49.99,
      totalPrice: 109.98
    },
    {
      id: '3',
      name: 'Silver Electroplated Edge Card',
      quantity: 100,
      gsm: '600',
      price: 59.99,
      totalPrice: 71.99
    }
  ];
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-navy text-white">
        <Navbar />
        
        <section className="pt-28 pb-12 px-4">
          <div className="container mx-auto">
            <h1 className="h2 mb-8">Your Shopping Cart</h1>
            
            {isCartEmpty ? (
              <div className="text-center py-16">
                <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <p className="text-gray-300 mb-8">Looks like you haven't added any business cards to your cart yet.</p>
                <Link to="/products">
                  <Button className="rounded-full bg-cyan hover:bg-cyan-light">
                    Browse Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3 space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="bg-navy-light border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4 aspect-[4/3] bg-navy-dark rounded-lg flex items-center justify-center text-white">
                        [Product Image]
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-300 text-sm">Paper Weight: {item.gsm} GSM</p>
                            <p className="text-gray-300 text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right mt-2 md:mt-0">
                            <p className="text-xl font-semibold">${item.totalPrice.toFixed(2)}</p>
                            <p className="text-gray-300 text-sm">${item.price.toFixed(2)} per unit</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                            <Trash2 size={16} className="mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Summary */}
                <div className="w-full lg:w-1/3">
                  <div className="bg-navy-light border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-2 pb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Tax (7%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Link to="/checkout">
                      <Button className="w-full rounded-full bg-cyan hover:bg-cyan-light group">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    
                    <div className="mt-4">
                      <Link to="/products">
                        <Button variant="ghost" className="w-full rounded-full">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Cart;
