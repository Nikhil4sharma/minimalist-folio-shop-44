
import React from 'react';
import { IndianRupee } from 'lucide-react';

interface ProductHeaderProps {
  name: string;
  category: string;
  basePrice: number;
  description: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  name, 
  category, 
  basePrice, 
  description 
}) => {
  return (
    <>
      <div>
        <h1 className="h2">{name}</h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">{category}</p>
      </div>
      
      <div className="flex items-center">
        <p className="text-2xl font-semibold flex items-center">
          <IndianRupee className="h-5 w-5" />
          {basePrice.toLocaleString('en-IN')}
        </p>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Base Price</span>
      </div>
      
      <p className="body-text text-gray-500 dark:text-gray-300">{description}</p>
    </>
  );
};
