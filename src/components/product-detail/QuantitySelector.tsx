
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface QuantitySelectorProps {
  selectedQuantity: string;
  setSelectedQuantity: (quantity: string) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  selectedQuantity,
  setSelectedQuantity
}) => {
  const { theme } = useTheme();
  const quantities = ['100', '250', '500', '1000', '2000', '5000'];
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Quantity</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {quantities.map((qty) => (
          <div
            key={qty}
            onClick={() => setSelectedQuantity(qty)}
            className={`cursor-pointer rounded-xl h-20 flex flex-col items-center justify-center border-2 transition-all
              ${selectedQuantity === qty 
                ? 'border-cyan bg-cyan/5' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            <span className="font-semibold text-lg">{qty}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">cards</span>
            
            {selectedQuantity === qty && (
              <div className="absolute top-2 right-2 text-cyan">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
