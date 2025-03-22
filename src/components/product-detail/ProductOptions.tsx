
import React, { useState } from 'react';
import { SizeSelector } from './SizeSelector';
import { DesignUploadSection } from './DesignUploadSection';
import { PaperWeightSelector } from './PaperWeightSelector';
import { PaperTypeSelector } from './PaperTypeSelector';
import { TreatmentOptionSelector } from './TreatmentOption';
import { ElectroplatingOptionSelector } from './ElectroplatingOptionSelector';
import { QuantitySelector } from './QuantitySelector';
import { PricingTable } from './PricingTable';
import { RequestQuoteDialog } from './RequestQuoteDialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { ElectroplatingOption, TreatmentOption, PaperType } from '@/contexts/CartContext';

interface ProductOptionsProps {
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
    basePrice: number;
    foilpressPrice: number;
    embossingPrice: number;
    edgepaintPrice: number;
    electroplatingFrontPrice: number;
    electroplatingBackPrice: number;
    paperTypePrice: Record<PaperType, number>;
    designPrice: number;
    totalPrice: number;
    sizeMultiplier: number;
  };
  productName: string;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  setters,
  pricing,
  productName
}) => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  
  return (
    <div className="pt-4 space-y-6">
      {/* Card Size */}
      <SizeSelector 
        selectedSize={options.selectedSize} 
        setSelectedSize={setters.setSelectedSize} 
      />
      
      {/* Do you have design? */}
      <DesignUploadSection 
        hasDesign={options.hasDesign}
        designType={options.designType}
        setHasDesign={setters.setHasDesign}
        setDesignType={setters.setDesignType}
        selectedFile={options.selectedFile}
        handleFileChange={setters.handleFileChange}
      />
      
      {/* Paper Weight (GSM) */}
      <PaperWeightSelector 
        selectedGSM={options.selectedGSM}
        setSelectedGSM={setters.setSelectedGSM}
      />
      
      {/* Paper Type */}
      <PaperTypeSelector 
        selectedPaperType={options.selectedPaperType}
        setSelectedPaperType={setters.setSelectedPaperType}
      />
      
      {/* Foilpress */}
      <TreatmentOptionSelector 
        title="Foilpress"
        selected={options.selectedFoilpress}
        setSelected={setters.setSelectedFoilpress}
        options={[
          { id: 'none', name: 'None', price: '₹0' },
          { id: 'single', name: 'Single Side', price: '₹500' },
          { id: 'both', name: 'Both Sides', price: '₹900' }
        ]}
      />
      
      {/* Embossing */}
      <TreatmentOptionSelector 
        title="Embossing"
        selected={options.selectedEmbossing}
        setSelected={setters.setSelectedEmbossing}
        options={[
          { id: 'none', name: 'None', price: '₹0' },
          { id: 'single', name: 'Single Side', price: '₹400' },
          { id: 'both', name: 'Both Sides', price: '₹750' }
        ]}
      />
      
      {/* Edgepaint */}
      <TreatmentOptionSelector 
        title="Edgepaint"
        selected={options.selectedEdgepaint}
        setSelected={setters.setSelectedEdgepaint}
        options={[
          { id: 'none', name: 'None', price: '₹0' },
          { id: 'single', name: 'Single Side', price: '₹450', display: 'Edge' }
        ]}
      />
      
      {/* Electroplating Front Side */}
      <ElectroplatingOptionSelector
        title="Electroplating Front Side"
        value={options.selectedElectroplatingFront}
        setValue={setters.setSelectedElectroplatingFront}
      />
      
      {/* Electroplating Back Side */}
      <ElectroplatingOptionSelector
        title="Electroplating Back Side"
        value={options.selectedElectroplatingBack}
        setValue={setters.setSelectedElectroplatingBack}
      />
      
      {/* Quantity */}
      <QuantitySelector 
        selectedQuantity={options.selectedQuantity}
        setSelectedQuantity={setters.setSelectedQuantity}
      />
      
      {/* Request Quote Button */}
      <div className="pt-2">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-dashed border-cyan text-cyan hover:bg-cyan/5"
          onClick={() => setQuoteDialogOpen(true)}
        >
          <MessageSquare className="h-5 w-5" />
          Request Custom Quote
        </Button>
      </div>
      
      {/* Pricing Table */}
      <PricingTable 
        selectedQuantity={options.selectedQuantity}
        basePrice={pricing.basePrice}
        selectedGSM={options.selectedGSM}
        selectedSize={options.selectedSize}
        selectedFoilpress={options.selectedFoilpress}
        foilpressPrice={pricing.foilpressPrice}
        selectedEmbossing={options.selectedEmbossing}
        embossingPrice={pricing.embossingPrice}
        selectedEdgepaint={options.selectedEdgepaint}
        edgepaintPrice={pricing.edgepaintPrice}
        selectedElectroplatingFront={options.selectedElectroplatingFront}
        electroplatingFrontPrice={pricing.electroplatingFrontPrice}
        selectedElectroplatingBack={options.selectedElectroplatingBack}
        electroplatingBackPrice={pricing.electroplatingBackPrice}
        selectedPaperType={options.selectedPaperType}
        paperTypePrice={pricing.paperTypePrice}
        hasDesign={options.hasDesign}
        designType={options.designType}
        designPrice={pricing.designPrice}
        totalPrice={pricing.totalPrice}
        sizeMultiplier={pricing.sizeMultiplier}
      />
      
      {/* Request Quote Dialog */}
      <RequestQuoteDialog 
        open={quoteDialogOpen}
        onOpenChange={setQuoteDialogOpen}
        productDetails={{
          productName,
          selectedQuantity: options.selectedQuantity,
          selectedSize: options.selectedSize,
          selectedGSM: options.selectedGSM,
          selectedPaperType: options.selectedPaperType,
          selectedFoilpress: options.selectedFoilpress,
          selectedEmbossing: options.selectedEmbossing,
          selectedEdgepaint: options.selectedEdgepaint,
          selectedElectroplatingFront: options.selectedElectroplatingFront,
          selectedElectroplatingBack: options.selectedElectroplatingBack,
          hasDesign: options.hasDesign,
          designType: options.designType,
          totalPrice: pricing.totalPrice
        }}
      />
    </div>
  );
};
