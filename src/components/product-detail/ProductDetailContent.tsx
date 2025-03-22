
import React from 'react';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductHeader } from './ProductHeader';
import { QuantitySelector } from './QuantitySelector';
import { PaperWeightSelector } from './PaperWeightSelector';
import { AddToCartSection } from './AddToCartSection';

interface ProductDetailContentProps {
  productImage: string;
  productName: string;
  productCategory: string;
  productDescription: string;
  basePrice: number;
  options: {
    selectedGSM: string;
    selectedQuantity: string;
  };
  setters: {
    setSelectedGSM: (gsm: string) => void;
    setSelectedQuantity: (quantity: string) => void;
  };
  pricing: {
    perCardPrice: number;
    totalPrice: number;
  };
  handleAddToCart: () => void;
}

export const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  productImage,
  productName,
  productCategory,
  productDescription,
  basePrice,
  options,
  setters,
  pricing,
  handleAddToCart
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Product Image */}
      <ProductImageGallery 
        mainImage={productImage} 
        productName={productName} 
      />
      
      {/* Product Details */}
      <div className="w-full lg:w-1/2 space-y-8">
        <ProductHeader 
          name={productName}
          category={productCategory}
          basePrice={basePrice}
          description={productDescription}
        />
        
        <div className="space-y-8 mt-6">
          {/* Paper Weight (GSM) */}
          <PaperWeightSelector 
            selectedGSM={options.selectedGSM}
            setSelectedGSM={setters.setSelectedGSM}
          />
          
          {/* Quantity */}
          <QuantitySelector 
            selectedQuantity={options.selectedQuantity}
            setSelectedQuantity={setters.setSelectedQuantity}
          />
        </div>
        
        {/* Add to Cart Section */}
        <AddToCartSection 
          perCardPrice={pricing.perCardPrice}
          totalPrice={pricing.totalPrice}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};
