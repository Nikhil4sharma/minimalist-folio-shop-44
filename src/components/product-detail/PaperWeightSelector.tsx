
import React from 'react';
import { Button } from '@/components/ui/button';

interface PaperWeightSelectorProps {
  selectedGSM: string;
  setSelectedGSM: (gsm: string) => void;
}

export const PaperWeightSelector: React.FC<PaperWeightSelectorProps> = ({
  selectedGSM,
  setSelectedGSM
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Paper Weight (GSM)</h3>
      <div className="flex gap-4">
        <Button 
          variant={selectedGSM === '350' ? 'default' : 'outline'} 
          className={`rounded-full ${selectedGSM === '350' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
          onClick={() => setSelectedGSM('350')}
        >
          350 GSM
        </Button>
        <Button 
          variant={selectedGSM === '600' ? 'default' : 'outline'} 
          className={`rounded-full ${selectedGSM === '600' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
          onClick={() => setSelectedGSM('600')}
        >
          600 GSM (+20%)
        </Button>
      </div>
    </div>
  );
};
