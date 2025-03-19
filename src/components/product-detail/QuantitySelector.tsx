
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  selectedQuantity: string;
  setSelectedQuantity: (quantity: string) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  selectedQuantity,
  setSelectedQuantity
}) => {
  const quantities = ['100', '250', '500', '1000', '2000', '5000'];
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Quantity</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {quantities.map((qty) => (
          <Button 
            key={qty}
            variant={selectedQuantity === qty ? 'default' : 'outline'} 
            className={`rounded-full ${selectedQuantity === qty ? 'bg-cyan hover:bg-cyan-light' : ''}`}
            onClick={() => setSelectedQuantity(qty)}
          >
            {qty} Cards
          </Button>
        ))}
      </div>
    </div>
  );
};
