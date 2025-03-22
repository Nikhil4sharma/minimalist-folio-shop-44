
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, IndianRupee, CreditCard } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useNavigate } from 'react-router-dom';

interface AddToCartSectionProps {
  perCardPrice: number;
  totalPrice: number;
  handleAddToCart: () => void;
}

export const AddToCartSection: React.FC<AddToCartSectionProps> = ({
  perCardPrice,
  totalPrice,
  handleAddToCart
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };
  
  return (
    <div className={`pt-6 mt-6 border-t ${
      theme === 'light' ? 'border-gray-200' : 'border-white/10'
    }`}>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Per Card Price:</span>
          <div className="flex items-center font-medium">
            <IndianRupee className="h-3.5 w-3.5 mr-1" />
            {perCardPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Price:</span>
          <div className="flex items-center text-2xl font-bold text-cyan">
            <IndianRupee className="h-5 w-5 mr-1" />
            {totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          className="h-14 rounded-full bg-white border-2 border-cyan text-cyan hover:bg-cyan/5 dark:bg-transparent dark:text-white dark:hover:bg-white/5 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
        
        <Button 
          className="h-14 rounded-full bg-cyan hover:bg-cyan-light dark:bg-cyan dark:hover:bg-cyan-light flex items-center justify-center gap-2"
          onClick={handleBuyNow}
        >
          <CreditCard className="h-5 w-5" />
          Buy Now
        </Button>
      </div>
    </div>
  );
};
