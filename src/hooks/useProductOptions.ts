
import { useState, useEffect } from 'react';
import { ElectroplatingOption, TreatmentOption, PaperType } from '@/contexts/CartContext';

interface ProductOptionsPricing {
  unitPrice: number;
  additionalOptionsPrice: number;
  totalPrice: number;
  perCardPrice: number;
  foilpressPrice: number;
  embossingPrice: number;
  edgepaintPrice: number;
  electroplatingFrontPrice: number;
  electroplatingBackPrice: number;
  paperTypePrice: Record<PaperType, number>;
  designPrice: number;
  gsmMultiplier: number;
  sizeMultiplier: number;
  quantityFactor: number;
}

interface ProductOptions {
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
}

export const useProductOptions = (basePrice: number, category: string) => {
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

  // Set default options based on product category
  useEffect(() => {
    if (category) {
      // Set default treatment based on category
      if (category === 'foiling') {
        setSelectedFoilpress('single');
      } else if (category === 'embossing') {
        setSelectedEmbossing('single');
      } else if (category === 'electroplating') {
        setSelectedElectroplatingFront('silver');
      } else if (category === 'spot-uv') {
        // Spot UV stays at default 'none'
      }
    }
  }, [category]);

  // Set specific product details
  const setProductDefaults = (paperWeight?: string, paperType?: string) => {
    // Set default GSM based on product details
    if (paperWeight) {
      const gsm = paperWeight.includes('600') ? '600' : '350';
      setSelectedGSM(gsm);
    }
    
    // Set default paper type based on product details
    if (paperType) {
      const paperTypeValue = paperType.toLowerCase();
      if (paperTypeValue.includes('keycolor') || paperTypeValue.includes('keycolour')) {
        setSelectedPaperType('keycolor');
      } else if (paperTypeValue.includes('cotton')) {
        setSelectedPaperType('cotton');
      } else if (paperTypeValue.includes('mohawk')) {
        setSelectedPaperType('mohawk');
      } else if (paperTypeValue.includes('suede')) {
        setSelectedPaperType('soft-suede');
      } else {
        setSelectedPaperType('matt');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Calculate prices
  const calculatePricing = (): ProductOptionsPricing => {
    const gsmMultiplier = selectedGSM === '600' ? 1.2 : 1;
    
    const quantityMap: Record<string, number> = {
      '100': 1,
      '250': 2.2,
      '500': 4,
      '750': 6,
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
    const totalPrice = (unitPrice * parseInt(selectedQuantity)) + additionalOptionsPrice;
    const perCardPrice = totalPrice / parseInt(selectedQuantity);

    return {
      unitPrice,
      additionalOptionsPrice,
      totalPrice,
      perCardPrice,
      foilpressPrice,
      embossingPrice,
      edgepaintPrice,
      electroplatingFrontPrice,
      electroplatingBackPrice,
      paperTypePrice,
      designPrice,
      gsmMultiplier,
      sizeMultiplier,
      quantityFactor
    };
  };

  const options: ProductOptions = {
    selectedGSM,
    selectedQuantity,
    selectedSize,
    selectedFoilpress,
    selectedEmbossing,
    selectedEdgepaint,
    selectedElectroplatingFront,
    selectedElectroplatingBack,
    selectedPaperType,
    hasDesign,
    designType,
    selectedFile
  };

  const setters = {
    setSelectedGSM,
    setSelectedQuantity,
    setSelectedSize,
    setSelectedFoilpress,
    setSelectedEmbossing,
    setSelectedEdgepaint,
    setSelectedElectroplatingFront,
    setSelectedElectroplatingBack,
    setSelectedPaperType,
    setHasDesign,
    setDesignType,
    handleFileChange
  };

  return {
    options,
    setters,
    pricing: calculatePricing(),
    setProductDefaults
  };
};
