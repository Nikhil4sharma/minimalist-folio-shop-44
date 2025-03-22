
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
  
  // Placeholder images for the thumbnails
  const placeholderImages = [
    '/lovable-uploads/b5454403-036b-4534-8fe6-da1799f55eae.png',
    '/lovable-uploads/02600f3a-8e73-4cf9-9273-6978b5946bba.png',
    '/lovable-uploads/63bedb39-3b36-4c40-b746-e4e3fc315cfc.png',
    '/lovable-uploads/ff823c94-4be2-4427-b2df-c3445f5c660b.png',
  ];
  
  return (
    <div className="w-full lg:w-1/2">
      <div className={`rounded-xl border aspect-[4/3] flex items-center justify-center overflow-hidden ${
        theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-navy-light border-white/10'
      }`}>
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={productName} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-600">No image available</div>
        )}
      </div>
      
      {/* Image thumbnails */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {placeholderImages.map((img, index) => (
          <div 
            key={index} 
            className={`aspect-[4/3] rounded-lg cursor-pointer overflow-hidden ${
              theme === 'light' ? 'bg-gray-100 border border-gray-200' : 'bg-navy-light border border-white/10'
            }`}
          >
            <img src={img} alt={`${productName} thumbnail ${index+1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};
