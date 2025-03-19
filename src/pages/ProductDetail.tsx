
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart, ElectroplatingOption, TreatmentOption, PaperType } from '@/contexts/CartContext';
import { products, getCategoryName } from '@/utils/productUtils';

// Import the component parts
import { ProductImageGallery } from '@/components/product-detail/ProductImageGallery';
import { ProductHeader } from '@/components/product-detail/ProductHeader';
import { SizeSelector } from '@/components/product-detail/SizeSelector';
import { DesignUploadSection } from '@/components/product-detail/DesignUploadSection';
import { PaperWeightSelector } from '@/components/product-detail/PaperWeightSelector';
import { PaperTypeSelector } from '@/components/product-detail/PaperTypeSelector';
import { TreatmentOptionSelector } from '@/components/product-detail/TreatmentOption';
import { ElectroplatingOptionSelector } from '@/components/product-detail/ElectroplatingOptionSelector';
import { QuantitySelector } from '@/components/product-detail/QuantitySelector';
import { PricingTable } from '@/components/product-detail/PricingTable';
import { AddToCartSection } from '@/components/product-detail/AddToCartSection';

// Import the uploaded image
const productImage = '/lovable-uploads/a3132fc2-9a35-41e0-87e3-e69fcdc7f66e.png';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  // In a real app, you would fetch product data from an API
  const product = products.find(p => p.id === id) || products[0];
  
  // State for all customization options
  const [selectedGSM, setSelectedGSM] = useState('350');
  const [selectedQuantity, setSelectedQuantity] = useState('100');
  const [selectedSize, setSelectedSize] = useState<'standard' | 'us' | 'square'>('standard');
  const [selectedFoilpress, setSelectedFoilpress] = useState<TreatmentOption>('none');
  const [selectedEmbossing, setSelectedEmbossing] = useState<TreatmentOption>('none');
  const [selectedEdgepaint, setSelectedEdgepaint] = useState<TreatmentOption>('none');
  const [selectedElectroplatingFront, setSelectedElectroplatingFront] = useState<ElectroplatingOption>('none');
  const [selectedElectroplatingBack, setSelectedElectroplatingBack] = useState<ElectroplatingOption>('none');
  const [selectedPaperType, setSelectedPaperType] = useState<PaperType>('matt');
  const [hasDesign, setHasDesign] = useState(false);
  const [designType, setDesignType] = useState<'upload' | 'expert'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Calculate price based on selected options
  const basePrice = product.price;
  
  const gsmMultiplier = selectedGSM === '600' ? 1.2 : 1;
  
  const quantityMap: Record<string, number> = {
    '100': 1,
    '250': 2.2,
    '500': 4,
    '1000': 7,
    '2000': 13,
    '5000': 30,
  };
  
  const sizeMultiplier = selectedSize === 'standard' ? 1 : selectedSize === 'us' ? 1.05 : 1.2;
  
  const foilpressPrice = selectedFoilpress === 'none' ? 0 : 
                         selectedFoilpress === 'single' ? 500 : 900;
                         
  const embossingPrice = selectedEmbossing === 'none' ? 0 : 
                         selectedEmbossing === 'single' ? 400 : 750;
                         
  const edgepaintPrice = selectedEdgepaint === 'none' ? 0 : 
                         selectedEdgepaint === 'single' ? 450 : 800;
                         
  const electroplatingFrontPrice = selectedElectroplatingFront === 'none' ? 0 : 
                                   selectedElectroplatingFront === 'gold' || 
                                   selectedElectroplatingFront === 'silver' || 
                                   selectedElectroplatingFront === 'copper' || 
                                   selectedElectroplatingFront === 'rose-gold' ? 600 : 0;
                                   
  const electroplatingBackPrice = selectedElectroplatingBack === 'none' ? 0 : 
                                 selectedElectroplatingBack === 'gold' || 
                                 selectedElectroplatingBack === 'silver' || 
                                 selectedElectroplatingBack === 'copper' || 
                                 selectedElectroplatingBack === 'rose-gold' ? 600 : 0;
                                 
  const paperTypePrice = {
    'matt': 0,
    'soft-suede': 100,
    'mohawk': 150,
    'keycolor': 250,
    'cotton': 300
  };
  
  const designPrice = hasDesign && designType === 'expert' ? 500 : 0;
  
  // Calculate unit price and total price
  const additionalOptionsPrice = foilpressPrice + embossingPrice + edgepaintPrice + 
                                electroplatingFrontPrice + electroplatingBackPrice + 
                                paperTypePrice[selectedPaperType] + designPrice;
                                
  const unitPrice = (basePrice * gsmMultiplier * sizeMultiplier);
  const quantityFactor = quantityMap[selectedQuantity];
  const totalPrice = (unitPrice * quantityFactor) + additionalOptionsPrice;
  const perCardPrice = totalPrice / parseInt(selectedQuantity);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      quantity: parseInt(selectedQuantity),
      gsm: selectedGSM,
      price: perCardPrice,
      totalPrice: totalPrice,
      size: selectedSize,
      foilpress: selectedFoilpress,
      embossing: selectedEmbossing,
      edgepaint: selectedEdgepaint,
      electroplatingFront: selectedElectroplatingFront,
      electroplatingBack: selectedElectroplatingBack,
      paperType: selectedPaperType,
      hasDesign: hasDesign,
      designType: hasDesign ? designType : undefined
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <ProductImageGallery 
              mainImage={productImage} 
              productName={product.name} 
            />
            
            {/* Product Details */}
            <div className="w-full lg:w-1/2 space-y-6">
              <ProductHeader 
                name={product.name}
                category={getCategoryName(product.category)}
                basePrice={basePrice}
                description={product.description}
              />
              
              <div className="space-y-4">
                <div className="pt-4 space-y-6">
                  {/* Card Size */}
                  <SizeSelector 
                    selectedSize={selectedSize} 
                    setSelectedSize={setSelectedSize} 
                  />
                  
                  {/* Do you have design? */}
                  <DesignUploadSection 
                    hasDesign={hasDesign}
                    designType={designType}
                    setHasDesign={setHasDesign}
                    setDesignType={setDesignType}
                    selectedFile={selectedFile}
                    handleFileChange={handleFileChange}
                  />
                  
                  {/* Paper Weight (GSM) */}
                  <PaperWeightSelector 
                    selectedGSM={selectedGSM}
                    setSelectedGSM={setSelectedGSM}
                  />
                  
                  {/* Paper Type */}
                  <PaperTypeSelector 
                    selectedPaperType={selectedPaperType}
                    setSelectedPaperType={setSelectedPaperType}
                  />
                  
                  {/* Foilpress */}
                  <TreatmentOptionSelector 
                    title="Foilpress"
                    selected={selectedFoilpress}
                    setSelected={setSelectedFoilpress}
                    options={[
                      { id: 'none', name: 'None', price: '₹0' },
                      { id: 'single', name: 'Single Side', price: '₹500' },
                      { id: 'both', name: 'Both Sides', price: '₹900' }
                    ]}
                  />
                  
                  {/* Embossing */}
                  <TreatmentOptionSelector 
                    title="Embossing"
                    selected={selectedEmbossing}
                    setSelected={setSelectedEmbossing}
                    options={[
                      { id: 'none', name: 'None', price: '₹0' },
                      { id: 'single', name: 'Single Side', price: '₹400' },
                      { id: 'both', name: 'Both Sides', price: '₹750' }
                    ]}
                  />
                  
                  {/* Edgepaint */}
                  <TreatmentOptionSelector 
                    title="Edgepaint"
                    selected={selectedEdgepaint}
                    setSelected={setSelectedEdgepaint}
                    options={[
                      { id: 'none', name: 'None', price: '₹0' },
                      { id: 'single', name: 'Single Side', price: '₹450', display: 'Edge' }
                    ]}
                  />
                  
                  {/* Electroplating Front Side */}
                  <ElectroplatingOptionSelector
                    title="Electroplating Front Side"
                    value={selectedElectroplatingFront}
                    setValue={setSelectedElectroplatingFront}
                  />
                  
                  {/* Electroplating Back Side */}
                  <ElectroplatingOptionSelector
                    title="Electroplating Back Side"
                    value={selectedElectroplatingBack}
                    setValue={setSelectedElectroplatingBack}
                  />
                  
                  {/* Quantity */}
                  <QuantitySelector 
                    selectedQuantity={selectedQuantity}
                    setSelectedQuantity={setSelectedQuantity}
                  />
                  
                  {/* Pricing Table */}
                  <PricingTable 
                    selectedQuantity={selectedQuantity}
                    basePrice={basePrice}
                    selectedGSM={selectedGSM}
                    selectedSize={selectedSize}
                    selectedFoilpress={selectedFoilpress}
                    foilpressPrice={foilpressPrice}
                    selectedEmbossing={selectedEmbossing}
                    embossingPrice={embossingPrice}
                    selectedEdgepaint={selectedEdgepaint}
                    edgepaintPrice={edgepaintPrice}
                    selectedElectroplatingFront={selectedElectroplatingFront}
                    electroplatingFrontPrice={electroplatingFrontPrice}
                    selectedElectroplatingBack={selectedElectroplatingBack}
                    electroplatingBackPrice={electroplatingBackPrice}
                    selectedPaperType={selectedPaperType}
                    paperTypePrice={paperTypePrice}
                    hasDesign={hasDesign}
                    designType={designType}
                    designPrice={designPrice}
                    totalPrice={totalPrice}
                    sizeMultiplier={sizeMultiplier}
                  />
                </div>
              </div>
              
              {/* Add to Cart Section */}
              <AddToCartSection 
                perCardPrice={perCardPrice}
                totalPrice={totalPrice}
                handleAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
