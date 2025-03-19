import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronRight, Info, IndianRupee, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart, ElectroplatingOption } from '@/contexts/CartContext';
import { useTheme } from '@/components/ThemeProvider';
import { Input } from '@/components/ui/input';

// Import the uploaded image
const productImage = '/lovable-uploads/a3132fc2-9a35-41e0-87e3-e69fcdc7f66e.png';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  
  // In a real app, you would fetch product data from an API
  const product = products.find(p => p.id === id) || products[0];
  
  // State for all customization options
  const [selectedGSM, setSelectedGSM] = useState('350');
  const [selectedQuantity, setSelectedQuantity] = useState('100');
  const [selectedSize, setSelectedSize] = useState('standard');
  const [selectedFoilpress, setSelectedFoilpress] = useState('none');
  const [selectedEmbossing, setSelectedEmbossing] = useState('none');
  const [selectedEdgepaint, setSelectedEdgepaint] = useState('none');
  const [selectedElectroplatingFront, setSelectedElectroplatingFront] = useState<ElectroplatingOption>('none');
  const [selectedElectroplatingBack, setSelectedElectroplatingBack] = useState<ElectroplatingOption>('none');
  const [selectedPaperType, setSelectedPaperType] = useState('matt');
  const [hasDesign, setHasDesign] = useState(false);
  const [designType, setDesignType] = useState<'upload' | 'expert'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Calculate price based on selected options
  const basePrice = product.price;
  
  const gsmMultiplier = selectedGSM === '600' ? 1.2 : 1;
  
  const quantityMap: Record<string, number> = {
    '100': 1,
    '250': 2.2,
    '500': 4,
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
  const totalPrice = (unitPrice * quantityFactor) + additionalOptionsPrice;
  const perCardPrice = totalPrice / parseInt(selectedQuantity);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      quantity: parseInt(selectedQuantity),
      gsm: selectedGSM,
      price: perCardPrice,
      totalPrice: totalPrice,
      size: selectedSize as 'standard' | 'us' | 'square',
      foilpress: selectedFoilpress as 'none' | 'single' | 'both',
      embossing: selectedEmbossing as 'none' | 'single' | 'both',
      edgepaint: selectedEdgepaint as 'none' | 'single' | 'both',
      electroplatingFront: selectedElectroplatingFront,
      electroplatingBack: selectedElectroplatingBack,
      paperType: selectedPaperType as 'matt' | 'soft-suede' | 'mohawk' | 'keycolor' | 'cotton',
      hasDesign: hasDesign,
      designType: hasDesign ? designType : undefined
    });
  };

  const renderElectroplatingOptions = (
    title: string, 
    value: ElectroplatingOption, 
    setValue: React.Dispatch<React.SetStateAction<ElectroplatingOption>>
  ) => (
    <div className={`border rounded-xl p-4 ${
      theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
    }`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-5 gap-2">
        {[
          { id: 'none', name: 'None', price: '₹0' },
          { id: 'gold', name: 'Gold', price: '₹600', color: 'bg-yellow-600' },
          { id: 'silver', name: 'Silver', price: '₹600', color: 'bg-gray-300' },
          { id: 'copper', name: 'Copper', price: '₹600', color: 'bg-orange-700' },
          { id: 'rose-gold', name: 'Rose Gold', price: '₹600', color: 'bg-pink-300' }
        ].map((option) => (
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

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <div className={`rounded-xl border aspect-[4/3] flex items-center justify-center overflow-hidden ${
                theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-navy-light border-white/10'
              }`}>
                <img 
                  src={productImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Add more product images or image selector here */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[1, 2, 3, 4].map((img) => (
                  <div 
                    key={img} 
                    className={`aspect-[4/3] rounded-lg cursor-pointer ${
                      theme === 'light' ? 'bg-gray-100 border border-gray-200' : 'bg-navy-light border border-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <h1 className="h2">{product.name}</h1>
                <p className="text-gray-500 dark:text-gray-300 mt-2">{getCategoryName(product.category)}</p>
              </div>
              
              <div className="flex items-center">
                <p className="text-2xl font-semibold flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {basePrice.toLocaleString('en-IN')}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Base Price</span>
              </div>
              
              <div className="space-y-4">
                <p className="body-text text-gray-500 dark:text-gray-300">{product.description}</p>
                
                <div className="pt-4 space-y-6">
                  {/* Card Size */}
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
                  
                  {/* Do you have design? */}
                  <div className={`border rounded-xl p-4 ${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
                  }`}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      Do you have the design?
                      <Info className="h-4 w-4 text-gray-400" />
                    </h3>
                    
                    <RadioGroup value={hasDesign ? (designType === 'upload' ? 'upload' : 'expert') : 'none'} onValueChange={(val) => {
                      if (val === 'none') {
                        setHasDesign(false);
                      } else {
                        setHasDesign(true);
                        setDesignType(val as 'upload' | 'expert');
                      }
                    }} className="space-y-4">
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
                  
                  {/* Paper Weight (GSM) */}
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
                  
                  {/* Paper Type */}
                  <div className={`border rounded-xl p-4 ${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
                  }`}>
                    <h3 className="text-lg font-semibold mb-3">Paper Type</h3>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {[
                        { id: 'matt', name: 'Matt Finish', price: '₹0.00' },
                        { id: 'soft-suede', name: 'Soft Suede', price: '₹100.00' },
                        { id: 'mohawk', name: 'Mohawk Classic', price: '₹150.00' },
                        { id: 'keycolor', name: 'Keycolor', price: '₹250.00' },
                        { id: 'cotton', name: 'Cotton', price: '₹300.00' }
                      ].map((paperType) => (
                        <div 
                          key={paperType.id}
                          className={`relative border p-2 rounded-lg cursor-pointer text-center ${
                            selectedPaperType === paperType.id
                              ? 'border-cyan bg-cyan/10'
                              : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                          }`}
                          onClick={() => setSelectedPaperType(paperType.id as any)}
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
                  
                  {/* Foilpress */}
                  <div className={`border rounded-xl p-4 ${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
                  }`}>
                    <h3 className="text-lg font-semibold mb-3">Foilpress</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'none', name: 'None', price: '₹0' },
                        { id: 'single', name: 'Single Side', price: '₹500' },
                        { id: 'both', name: 'Both Sides', price: '₹900' }
                      ].map((option) => (
                        <div 
                          key={option.id}
                          className={`relative border p-2 rounded-lg cursor-pointer text-center ${
                            selectedFoilpress === option.id
                              ? 'border-cyan bg-cyan/10'
                              : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                          }`}
                          onClick={() => setSelectedFoilpress(option.id as any)}
                        >
                          <div className="h-16 flex items-center justify-center">
                            {option.id === 'none' ? (
                              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                                <Check className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="w-16 h-12 bg-cyan/20 rounded flex items-center justify-center">
                                {option.id === 'single' ? 'Front' : 'F+B'}
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-medium">{option.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{option.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Embossing */}
                  <div className={`border rounded-xl p-4 ${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
                  }`}>
                    <h3 className="text-lg font-semibold mb-3">Embossing</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'none', name: 'None', price: '₹0' },
                        { id: 'single', name: 'Single Side', price: '₹400' },
                        { id: 'both', name: 'Both Sides', price: '₹750' }
                      ].map((option) => (
                        <div 
                          key={option.id}
                          className={`relative border p-2 rounded-lg cursor-pointer text-center ${
                            selectedEmbossing === option.id
                              ? 'border-cyan bg-cyan/10'
                              : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                          }`}
                          onClick={() => setSelectedEmbossing(option.id as any)}
                        >
                          <div className="h-16 flex items-center justify-center">
                            {option.id === 'none' ? (
                              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                                <Check className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="w-16 h-12 bg-cyan/20 rounded flex items-center justify-center">
                                {option.id === 'single' ? 'Front' : 'F+B'}
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-medium">{option.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{option.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Edgepaint */}
                  <div className={`border rounded-xl p-4 ${
                    theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-navy-light border-white/10'
                  }`}>
                    <h3 className="text-lg font-semibold mb-3">Edgepaint</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'none', name: 'None', price: '₹0' },
                        { id: 'single', name: 'Single Side', price: '₹450' }
                      ].map((option) => (
                        <div 
                          key={option.id}
                          className={`relative border p-2 rounded-lg cursor-pointer text-center ${
                            selectedEdgepaint === option.id
                              ? 'border-cyan bg-cyan/10'
                              : theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                          }`}
                          onClick={() => setSelectedEdgepaint(option.id as any)}
                        >
                          <div className="h-16 flex items-center justify-center">
                            {option.id === 'none' ? (
                              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                                <Check className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="w-16 h-12 bg-cyan/20 rounded flex items-center justify-center">
                                Edge
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-medium">{option.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{option.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Electroplating Front Side */}
                  {renderElectroplatingOptions("Electroplating Front Side", selectedElectroplatingFront, setSelectedElectroplatingFront)}
                  
                  {/* Electroplating Back Side */}
                  {renderElectroplatingOptions("Electroplating Back Side", selectedElectroplatingBack, setSelectedElectroplatingBack)}
                  
                  {/* Quantity */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {['100', '250', '500', '1000', '2000', '5000'].map((qty) => (
                        <Button 
                          key={qty}
                          variant={selectedQuantity === qty ? 'default' : 'outline'} 
                          className={`rounded-full ${selectedQuantity === qty ? 'bg-cyan hover:bg-cyan-light' : ''}`}
                          onClick={() => setSelectedQuantity(qty)}
                        >
                          {qty} Cards
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Pricing Table */}
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
                </div>
              </div>
              
              <div className={`border-t pt-4 ${
                theme === 'light' ? 'border-gray-200' : 'border-white/10'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Per Card Price:</span>
                    <span className="ml-2 font-semibold flex items-center">
                      <IndianRupee className="h-3 w-3" />
                      {perCardPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="text-lg">Total Price:</span>
                    <span className="text-2xl font-bold ml-2 flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="rounded-full bg-cyan hover:bg-cyan-light flex-1 gap-2 py-6"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

function getCategoryName(category: string) {
  const categories: Record<string, string> = {
    'foiling': 'Foiling Cards',
    'quick': 'Quick Cards',
    'electroplating': 'Electroplating Cards',
    'spot-uv': 'Spot UV Cards'
  };
  
  return categories[category] || category;
}

const products = [
  {
    id: '1',
    name: 'Classic Foil Business Card',
    description: 'Elegant business card with gold foil accents on premium paper stock. These cards make a statement with their subtle shimmer and luxurious feel. Perfect for executives, consultants, and professionals in creative industries. Each card is carefully crafted with precision and attention to detail.',
    price: 499,
    category: 'foiling'
  },
  {
    id: '2',
    name: 'Quick Matte Business Card',
    description: 'Professional matte-finished cards delivered in 2-3 business days. These no-nonsense cards provide a clean, sophisticated look with their smooth matte finish. Ideal for business professionals who need quality cards quickly.',
    price: 299,
    category: 'quick'
  },
  {
    id: '3',
    name: 'Silver Electroplated Edge Card',
    description: 'Luxury cards with silver electroplated edges for a sophisticated look. The metallic shine around the edges creates a striking visual effect that catches light from every angle. These premium cards are perfect for making a memorable first impression.',
    price: 599,
    category: 'electroplating'
  },
  {
    id: '4',
    name: 'Spot UV Gloss Highlight Card',
    description: 'Premium cards with strategic glossy UV highlights over a matte base. This contrast between matte and gloss creates a tactile experience that recipients won\'t forget. The selective glossy elements can emphasize logos, text, or design elements.',
    price: 399,
    category: 'spot-uv'
  },
];

export default ProductDetail;
