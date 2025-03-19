
import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { PaperType } from '@/contexts/CartContext';

interface PricingTableProps {
  selectedQuantity: string;
  basePrice: number;
  selectedGSM: string;
  selectedSize: string;
  selectedFoilpress: string;
  foilpressPrice: number;
  selectedEmbossing: string;
  embossingPrice: number;
  selectedEdgepaint: string;
  edgepaintPrice: number;
  selectedElectroplatingFront: string;
  electroplatingFrontPrice: number;
  selectedElectroplatingBack: string;
  electroplatingBackPrice: number;
  selectedPaperType: PaperType;
  paperTypePrice: Record<PaperType, number>;
  hasDesign: boolean;
  designType?: 'upload' | 'expert';
  designPrice: number;
  totalPrice: number;
  sizeMultiplier: number;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  selectedQuantity,
  basePrice,
  selectedGSM,
  selectedSize,
  selectedFoilpress,
  foilpressPrice,
  selectedEmbossing,
  embossingPrice,
  selectedEdgepaint,
  edgepaintPrice,
  selectedElectroplatingFront,
  electroplatingFrontPrice,
  selectedElectroplatingBack,
  electroplatingBackPrice,
  selectedPaperType,
  paperTypePrice,
  hasDesign,
  designType,
  designPrice,
  totalPrice,
  sizeMultiplier
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-xl border overflow-hidden mt-8 ${
      theme === 'light' ? 'bg-white border-gray-200' : 'bg-navy-light border-white/10'
    }`}>
      <h3 className="text-lg font-semibold p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-navy-dark">
        Price Breakdown
      </h3>
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <span>Base price ({selectedQuantity} x ₹{basePrice})</span>
          <span>₹{(basePrice * parseInt(selectedQuantity)).toLocaleString('en-IN')}</span>
        </div>
        {selectedGSM === '600' && (
          <div className="flex justify-between">
            <span>600 GSM upgrade (+20%)</span>
            <span>₹{(basePrice * 0.2 * parseInt(selectedQuantity)).toLocaleString('en-IN')}</span>
          </div>
        )}
        {selectedSize !== 'standard' && (
          <div className="flex justify-between">
            <span>{selectedSize.toUpperCase()} size</span>
            <span>₹{((sizeMultiplier - 1) * basePrice * parseInt(selectedQuantity)).toLocaleString('en-IN')}</span>
          </div>
        )}
        {selectedFoilpress !== 'none' && (
          <div className="flex justify-between">
            <span>Foilpress ({selectedFoilpress})</span>
            <span>₹{foilpressPrice.toLocaleString('en-IN')}</span>
          </div>
        )}
        {selectedEmbossing !== 'none' && (
          <div className="flex justify-between">
            <span>Embossing ({selectedEmbossing})</span>
            <span>₹{embossingPrice.toLocaleString('en-IN')}</span>
          </div>
        )}
        {selectedEdgepaint !== 'none' && (
          <div className="flex justify-between">
            <span>Edgepaint</span>
            <span>₹{edgepaintPrice.toLocaleString('en-IN')}</span>
          </div>
        )}
        {selectedElectroplatingFront !== 'none' && (
          <div className="flex justify-between">
            <span>Electroplating Front ({selectedElectroplatingFront})</span>
            <span>₹{electroplatingFrontPrice.toLocaleString('en-IN')}</span>
          </div>
        )}
        {selectedElectroplatingBack !== 'none' && (
          <div className="flex justify-between">
            <span>Electroplating Back ({selectedElectroplatingBack})</span>
            <span>₹{electroplatingBackPrice.toLocaleString('en-IN')}</span>
          </div>
        )}
        {selectedPaperType !== 'matt' && (
          <div className="flex justify-between">
            <span>Paper Type ({selectedPaperType})</span>
            <span>₹{paperTypePrice[selectedPaperType].toLocaleString('en-IN')}</span>
          </div>
        )}
        {hasDesign && designType === 'expert' && (
          <div className="flex justify-between">
            <span>Expert Design</span>
            <span>₹{designPrice.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="border-t pt-2 mt-2 font-bold flex justify-between">
          <span>Total</span>
          <span className="text-lg">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};
