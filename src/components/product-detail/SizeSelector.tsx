
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

type CardSize = 'standard' | 'us' | 'square';

interface SizeSelectorProps {
  selectedSize: CardSize;
  setSelectedSize: (size: CardSize) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  selectedSize, 
  setSelectedSize 
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold">Business Card Size</h3>
        <Info className="h-4 w-4 text-gray-400" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Button 
          variant={selectedSize === 'standard' ? 'default' : 'outline'} 
          className={`rounded-md py-2 h-auto text-xs sm:text-sm ${selectedSize === 'standard' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
          onClick={() => setSelectedSize('standard')}
        >
          STANDARD - 3.5" x 2.0"
        </Button>
        <Button 
          variant={selectedSize === 'us' ? 'default' : 'outline'} 
          className={`rounded-md py-2 h-auto text-xs sm:text-sm ${selectedSize === 'us' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
          onClick={() => setSelectedSize('us')}
        >
          US - 3.46" x 2.16"
        </Button>
        <Button 
          variant={selectedSize === 'square' ? 'default' : 'outline'} 
          className={`rounded-md py-2 h-auto text-xs sm:text-sm ${selectedSize === 'square' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
          onClick={() => setSelectedSize('square')}
        >
          SQUARE 2.4" x 2.4"
        </Button>
      </div>
    </div>
  );
};
