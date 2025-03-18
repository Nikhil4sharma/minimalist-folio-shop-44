
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app, you would fetch product data from an API
  const product = products.find(p => p.id === id) || products[0];
  
  const [selectedGSM, setSelectedGSM] = useState('350');
  const [selectedQuantity, setSelectedQuantity] = useState('100');
  
  // Calculate price based on selected options
  const basePrice = product.price;
  const gsmMultiplier = selectedGSM === '600' ? 1.2 : 1;
  const quantityMap: Record<string, number> = {
    '100': 1,
    '250': 2.2,
    '500': 4,
    '1000': 7
  };
  
  const totalPrice = basePrice * gsmMultiplier * quantityMap[selectedQuantity];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-navy text-white">
        <Navbar />
        
        <section className="pt-28 pb-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="w-full md:w-1/2 bg-navy-light rounded-xl border border-white/10 aspect-[4/3] flex items-center justify-center">
                [Product Image]
              </div>
              
              {/* Product Details */}
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h1 className="h2">{product.name}</h1>
                  <p className="text-gray-300 mt-2">{getCategoryName(product.category)}</p>
                </div>
                
                <p className="text-2xl font-semibold">${basePrice.toFixed(2)}</p>
                
                <div className="space-y-4">
                  <p className="body-text text-gray-300">{product.description}</p>
                  
                  <div className="space-y-4 pt-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Paper Weight (GSM)</h3>
                      <div className="flex gap-4">
                        <Button 
                          variant={selectedGSM === '350' ? 'default' : 'outline'} 
                          className="rounded-full"
                          onClick={() => setSelectedGSM('350')}
                        >
                          350 GSM
                        </Button>
                        <Button 
                          variant={selectedGSM === '600' ? 'default' : 'outline'} 
                          className="rounded-full"
                          onClick={() => setSelectedGSM('600')}
                        >
                          600 GSM (+20%)
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          variant={selectedQuantity === '100' ? 'default' : 'outline'} 
                          className="rounded-full"
                          onClick={() => setSelectedQuantity('100')}
                        >
                          100 Cards
                        </Button>
                        <Button 
                          variant={selectedQuantity === '250' ? 'default' : 'outline'} 
                          className="rounded-full"
                          onClick={() => setSelectedQuantity('250')}
                        >
                          250 Cards
                        </Button>
                        <Button 
                          variant={selectedQuantity === '500' ? 'default' : 'outline'} 
                          className="rounded-full"
                          onClick={() => setSelectedQuantity('500')}
                        >
                          500 Cards
                        </Button>
                        <Button 
                          variant={selectedQuantity === '1000' ? 'default' : 'outline'} 
                          className="rounded-full"
                          onClick={() => setSelectedQuantity('1000')}
                        >
                          1000 Cards
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Total Price:</span>
                    <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="rounded-full bg-cyan hover:bg-cyan-light flex-1 gap-2">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </Button>
                    <Button variant="default" className="rounded-full flex-1 gap-2">
                      Customize Now
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
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
    price: 49.99,
    category: 'foiling'
  },
  {
    id: '2',
    name: 'Quick Matte Business Card',
    description: 'Professional matte-finished cards delivered in 2-3 business days. These no-nonsense cards provide a clean, sophisticated look with their smooth matte finish. Ideal for business professionals who need quality cards quickly.',
    price: 29.99,
    category: 'quick'
  },
  {
    id: '3',
    name: 'Silver Electroplated Edge Card',
    description: 'Luxury cards with silver electroplated edges for a sophisticated look. The metallic shine around the edges creates a striking visual effect that catches light from every angle. These premium cards are perfect for making a memorable first impression.',
    price: 59.99,
    category: 'electroplating'
  },
  {
    id: '4',
    name: 'Spot UV Gloss Highlight Card',
    description: 'Premium cards with strategic glossy UV highlights over a matte base. This contrast between matte and gloss creates a tactile experience that recipients won\'t forget. The selective glossy elements can emphasize logos, text, or design elements.',
    price: 39.99,
    category: 'spot-uv'
  },
];

export default ProductDetail;
