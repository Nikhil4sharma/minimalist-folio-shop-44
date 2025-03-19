
import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { PaperType } from '@/contexts/CartContext';

interface PaperTypeSelectorProps {
  selectedPaperType: PaperType;
  setSelectedPaperType: (paperType: PaperType) => void;
}

export const PaperTypeSelector: React.FC<PaperTypeSelectorProps> = ({
  selectedPaperType,
  setSelectedPaperType
}) => {
  const { theme } = useTheme();
  
  const paperTypes = [
    { id: 'matt', name: 'Matt Finish', price: '₹0.00' },
    { id: 'soft-suede', name: 'Soft Suede', price: '₹100.00' },
    { id: 'mohawk', name: 'Mohawk Classic', price: '₹150.00' },
    { id: 'keycolor', name: 'Keycolor', price: '₹250.00' },
    { id: 'cotton', name: 'Cotton', price: '₹300.00' }
  ];
  
  return (
    <div className={`border rounded-xl p-4 ${
      theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
    }`}>
      <h3 className="text-lg font-semibold mb-3">Paper Type</h3>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {paperTypes.map((paperType) => (
          <div 
            key={paperType.id}
            className={`relative border p-2 rounded-lg cursor-pointer text-center ${
              selectedPaperType === paperType.id
                ? 'border-cyan bg-cyan/10'
                : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}
            onClick={() => setSelectedPaperType(paperType.id as PaperType)}
          >
            <p className="text-sm font-medium mb-1">{paperType.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{paperType.price}</p>
            {selectedPaperType === paperType.id && (
              <div className="absolute top-1 right-1 text-cyan">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
