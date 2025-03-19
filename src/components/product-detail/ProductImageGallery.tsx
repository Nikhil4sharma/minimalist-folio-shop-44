
import React from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  mainImage, 
  productName 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full lg:w-1/2">
      <div className={`rounded-xl border aspect-[4/3] flex items-center justify-center overflow-hidden ${
        theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-navy-light border-white/10'
      }`}>
        <img 
          src={mainImage} 
          alt={productName} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Image thumbnails */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[1, 2, 3, 4].map((img) => (
          <div 
            key={img} 
            className={`aspect-[4/3] rounded-lg cursor-pointer ${
              theme === 'light' ? 'bg-gray-100 border border-gray-200' : 'bg-navy-light border border-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
