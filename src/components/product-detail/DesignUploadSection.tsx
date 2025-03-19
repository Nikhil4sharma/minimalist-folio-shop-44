
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface DesignUploadSectionProps {
  hasDesign: boolean;
  designType: 'upload' | 'expert';
  setHasDesign: (value: boolean) => void;
  setDesignType: (type: 'upload' | 'expert') => void;
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DesignUploadSection: React.FC<DesignUploadSectionProps> = ({
  hasDesign,
  designType,
  setHasDesign,
  setDesignType,
  selectedFile,
  handleFileChange
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`border rounded-xl p-4 ${
      theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
    }`}>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        Do you have the design?
        <Info className="h-4 w-4 text-gray-400" />
      </h3>
      
      <RadioGroup 
        value={hasDesign ? (designType === 'upload' ? 'upload' : 'expert') : 'none'} 
        onValueChange={(val) => {
          if (val === 'none') {
            setHasDesign(false);
          } else {
            setHasDesign(true);
            setDesignType(val as 'upload' | 'expert');
          }
        }} 
        className="space-y-4"
      >
        <div className="flex items-start gap-2">
          <RadioGroupItem value="upload" id="upload" className="mt-1" />
          <div>
            <Label htmlFor="upload" className="font-medium cursor-pointer">Upload or email your design</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Either upload here or email at hi@chapai.com with the order number as the subject.
            </p>
            {hasDesign && designType === 'upload' && (
              <div className="mt-2">
                <Input 
                  type="file" 
                  id="designFile"
                  accept=".pdf,.ai,.eps,.psd,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="mt-1 w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Min size: 0 MB, Max size: 5 MB
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <RadioGroupItem value="expert" id="expert" className="mt-1" />
          <div>
            <Label htmlFor="expert" className="font-medium cursor-pointer">Want the experts design for you</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our design team will be in touch on call/WhatsApp and get a creative design made for both sides of your business card. You will have to provide us with your brand logo in any vector format.
            </p>
            {hasDesign && designType === 'expert' && (
              <p className="text-sm text-cyan mt-1">+ ₹500.00 for expert design</p>
            )}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
