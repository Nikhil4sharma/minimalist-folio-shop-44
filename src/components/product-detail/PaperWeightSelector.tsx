
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface PaperWeightSelectorProps {
  selectedGSM: string;
  setSelectedGSM: (gsm: string) => void;
}

export const PaperWeightSelector: React.FC<PaperWeightSelectorProps> = ({
  selectedGSM,
  setSelectedGSM
}) => {
  const { theme } = useTheme();
  
  const options = [
    { value: '350', label: '350 GSM', description: 'Standard weight' },
    { value: '600', label: '600 GSM', description: 'Premium thick card (+20%)' }
  ];
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Paper Weight</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <div 
            key={option.value}
            onClick={() => setSelectedGSM(option.value)}
            className={`cursor-pointer p-4 rounded-xl relative flex flex-col justify-between border-2 transition-all
              ${selectedGSM === option.value 
                ? 'border-cyan bg-cyan/5' 
                : 'border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <div>
              <div className="font-semibold text-lg mb-1">{option.label}</div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{option.description}</p>
            </div>
            
            {selectedGSM === option.value && (
              <div className="absolute top-3 right-3 text-cyan">
                <Check className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
