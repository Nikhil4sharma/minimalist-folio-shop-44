
import React from 'react';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductHeader } from './ProductHeader';
import { ProductOptions } from './ProductOptions';
import { AddToCartSection } from './AddToCartSection';
import { ElectroplatingOption, TreatmentOption, PaperType } from '@/contexts/CartContext';

interface ProductDetailContentProps {
  productImage: string;
  productName: string;
  productCategory: string;
  productDescription: string;
  basePrice: number;
  options: {
    selectedGSM: string;
    selectedQuantity: string;
    selectedSize: 'standard' | 'us' | 'square';
    selectedFoilpress: TreatmentOption;
    selectedEmbossing: TreatmentOption;
    selectedEdgepaint: TreatmentOption;
    selectedElectroplatingFront: ElectroplatingOption;
    selectedElectroplatingBack: ElectroplatingOption;
    selectedPaperType: PaperType;
    hasDesign: boolean;
    designType: 'upload' | 'expert';
    selectedFile: File | null;
  };
  setters: {
    setSelectedGSM: (gsm: string) => void;
    setSelectedQuantity: (quantity: string) => void;
    setSelectedSize: (size: 'standard' | 'us' | 'square') => void;
    setSelectedFoilpress: (option: TreatmentOption) => void;
    setSelectedEmbossing: (option: TreatmentOption) => void;
    setSelectedEdgepaint: (option: TreatmentOption) => void;
    setSelectedElectroplatingFront: (option: ElectroplatingOption) => void;
    setSelectedElectroplatingBack: (option: ElectroplatingOption) => void;
    setSelectedPaperType: (paperType: PaperType) => void;
    setHasDesign: (hasDesign: boolean) => void;
    setDesignType: (type: 'upload' | 'expert') => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  pricing: {
    perCardPrice: number;
    totalPrice: number;
    basePrice: number;
    foilpressPrice: number;
    embossingPrice: number;
    edgepaintPrice: number;
    electroplatingFrontPrice: number;
    electroplatingBackPrice: number;
    paperTypePrice: Record<PaperType, number>;
    designPrice: number;
    sizeMultiplier: number;
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
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Product Image */}
      <ProductImageGallery 
        mainImage={productImage} 
        productName={productName} 
      />
      
      {/* Product Details */}
      <div className="w-full lg:w-1/2 space-y-6">
        <ProductHeader 
          name={productName}
          category={productCategory}
          basePrice={basePrice}
          description={productDescription}
        />
        
        <div className="space-y-4">
          <ProductOptions 
            options={options}
            setters={setters}
            pricing={{
              basePrice,
              foilpressPrice: pricing.foilpressPrice,
              embossingPrice: pricing.embossingPrice,
              edgepaintPrice: pricing.edgepaintPrice,
              electroplatingFrontPrice: pricing.electroplatingFrontPrice,
              electroplatingBackPrice: pricing.electroplatingBackPrice,
              paperTypePrice: pricing.paperTypePrice,
              designPrice: pricing.designPrice,
              totalPrice: pricing.totalPrice,
              sizeMultiplier: pricing.sizeMultiplier
            }}
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
