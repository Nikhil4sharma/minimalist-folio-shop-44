
import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { TreatmentOption as TreatmentOptionType } from '@/contexts/CartContext';

interface TreatmentOptionProps {
  title: string;
  selected: TreatmentOptionType;
  setSelected: (option: TreatmentOptionType) => void;
  options: Array<{
    id: TreatmentOptionType;
    name: string;
    price: string;
    display?: string;
  }>;
}

export const TreatmentOptionSelector: React.FC<TreatmentOptionProps> = ({
  title,
  selected,
  setSelected,
  options
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`border rounded-xl p-4 ${
      theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
    }`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`relative border p-2 rounded-lg cursor-pointer text-center ${
              selected === option.id
                ? 'border-cyan bg-cyan/10'
                : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}
            onClick={() => setSelected(option.id)}
          >
            <div className="h-16 flex items-center justify-center">
              {option.id === 'none' ? (
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
              ) : (
                <div className="w-16 h-12 bg-cyan/20 rounded flex items-center justify-center">
                  {option.display || (option.id === 'single' ? 'Front' : 'F+B')}
                </div>
              )}
            </div>
            <p className="text-sm font-medium">{option.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{option.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
