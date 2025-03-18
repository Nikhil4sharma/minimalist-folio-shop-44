
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, IndianRupee } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, shipping, tax, total } = useCart();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0;

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="h2 mb-8">Your Shopping Cart</h1>
          
          {isCartEmpty ? (
            <div className="text-center py-16">
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-500 dark:text-gray-300 mb-8">Looks like you haven't added any business cards to your cart yet.</p>
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
                  <div key={item.id} className={`border rounded-xl p-4 flex flex-col md:flex-row gap-4 ${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
                  }`}>
                    <div className="w-full md:w-1/4 aspect-[4/3] bg-gray-200 dark:bg-navy-dark rounded-lg flex items-center justify-center text-navy dark:text-white">
                      [Product Image]
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-500 dark:text-gray-300 text-sm">Paper Weight: {item.gsm} GSM</p>
                          <p className="text-gray-500 dark:text-gray-300 text-sm">Size: {item.size === 'standard' ? 'Standard (3.5" x 2.0")' : item.size === 'us' ? 'US (3.46" x 2.16")' : 'Square (2.4" x 2.4")'}</p>
                          
                          {/* Additional details based on treatments */}
                          {item.foilpress !== 'none' && (
                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                              Foil Press: {item.foilpress === 'single' ? 'Single Side' : 'Both Sides'}
                            </p>
                          )}
                          
                          {item.embossing !== 'none' && (
                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                              Embossing: {item.embossing === 'single' ? 'Single Side' : 'Both Sides'}
                            </p>
                          )}
                          
                          {item.edgepaint !== 'none' && (
                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                              Edge Paint: {item.edgepaint === 'single' ? 'Single Side' : 'Both Sides'}
                            </p>
                          )}
                          
                          {item.electroplatingFront !== 'none' && (
                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                              Electroplating Front: {item.electroplatingFront.replace('-', ' ')} sq. inch
                            </p>
                          )}
                          
                          {item.electroplatingBack !== 'none' && (
                            <p className="text-gray-500 dark:text-gray-300 text-sm">
                              Electroplating Back: {item.electroplatingBack.replace('-', ' ')} sq. inch
                            </p>
                          )}
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-xl font-semibold flex items-center justify-end">
                            <IndianRupee size={16} className="mr-1" />
                            {item.totalPrice.toLocaleString('en-IN')}
                          </p>
                          <p className="text-gray-500 dark:text-gray-300 text-sm flex items-center justify-end">
                            <IndianRupee size={12} className="mr-1" />
                            {item.price.toLocaleString('en-IN')} per unit
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm">Quantity:</p>
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 rounded-l-md p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <div className={`h-8 px-3 flex items-center justify-center border-y ${
                              theme === 'light' ? 'border-gray-300' : 'border-gray-600'
                            }`}>
                              {item.quantity}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 rounded-r-md p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => handleRemoveItem(item.id)}
                        >
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
                <div className={`border rounded-xl p-6 ${
                  theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
                }`}>
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 pb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-300">Subtotal</span>
                      <span className="flex items-center">
                        <IndianRupee size={14} /> 
                        {subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-300">Shipping</span>
                      <span className="flex items-center">
                        <IndianRupee size={14} />
                        {shipping.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-300">GST (18%)</span>
                      <span className="flex items-center">
                        <IndianRupee size={14} />
                        {tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`border-t pt-4 mb-6 ${
                    theme === 'light' ? 'border-gray-200' : 'border-white/10'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold flex items-center">
                        <IndianRupee size={18} />
                        {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
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
  );
};

export default Cart;
