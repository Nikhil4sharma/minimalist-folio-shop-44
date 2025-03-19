
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, IndianRupee } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

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
  
  return (
    <div className={`border-t pt-4 ${
      theme === 'light' ? 'border-gray-200' : 'border-white/10'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-300">Per Card Price:</span>
          <span className="ml-2 font-semibold flex items-center">
            <IndianRupee className="h-3 w-3" />
            {perCardPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-lg">Total Price:</span>
          <span className="text-2xl font-bold ml-2 flex items-center">
            <IndianRupee className="h-4 w-4" />
            {totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="rounded-full bg-cyan hover:bg-cyan-light flex-1 gap-2 py-6"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
