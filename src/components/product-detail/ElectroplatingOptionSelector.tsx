
import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { ElectroplatingOption } from '@/contexts/CartContext';

interface ElectroplatingOptionSelectorProps {
  title: string;
  value: ElectroplatingOption;
  setValue: React.Dispatch<React.SetStateAction<ElectroplatingOption>>;
}

export const ElectroplatingOptionSelector: React.FC<ElectroplatingOptionSelectorProps> = ({
  title,
  value,
  setValue
}) => {
  const { theme } = useTheme();
  
  const options = [
    { id: 'none', name: 'None', price: '₹0' },
    { id: 'gold', name: 'Gold', price: '₹600', color: 'bg-yellow-600' },
    { id: 'silver', name: 'Silver', price: '₹600', color: 'bg-gray-300' },
    { id: 'copper', name: 'Copper', price: '₹600', color: 'bg-orange-700' },
    { id: 'rose-gold', name: 'Rose Gold', price: '₹600', color: 'bg-pink-300' }
  ];
  
  return (
    <div className={`border rounded-xl p-4 ${
      theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
    }`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-5 gap-2">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`relative border p-2 rounded-lg cursor-pointer text-center ${
              value === option.id
                ? 'border-cyan bg-cyan/10'
                : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}
            onClick={() => setValue(option.id as ElectroplatingOption)}
          >
            <div className="h-16 flex items-center justify-center">
              {option.id === 'none' ? (
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
              ) : (
                <div className={`w-10 h-10 ${option.color} rounded-full`}></div>
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
