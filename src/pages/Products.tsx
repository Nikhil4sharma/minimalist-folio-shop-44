
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight } from 'lucide-react';

const Products = () => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto">
          <h1 className="h2 mb-4">Our Business Card Collection</h1>
          <p className="body-text text-gray-700 dark:text-gray-300 mb-8">
            Browse our selection of premium business cards, each designed with quality and professionalism in mind.
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'all' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Cards
            </Button>
            <Button 
              variant={filter === 'foiling' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'foiling' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('foiling')}
            >
              Foiling Cards
            </Button>
            <Button 
              variant={filter === 'quick' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'quick' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('quick')}
            >
              Quick Cards
            </Button>
            <Button 
              variant={filter === 'electroplating' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'electroplating' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('electroplating')}
            >
              Electroplating Cards
            </Button>
            <Button 
              variant={filter === 'spot-uv' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'spot-uv' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('spot-uv')}
            >
              Spot UV Cards
            </Button>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white dark:bg-navy-light border-gray-200 dark:border-white/10 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 dark:bg-navy-dark relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    [Product Image]
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-navy dark:text-white">{product.name}</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    {getCategoryName(product.category)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/products/${product.id}`} className="w-full">
                    <Button className="w-full rounded-full bg-cyan hover:bg-cyan-light group">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
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
    description: 'Elegant business card with gold foil accents on premium paper stock. These cards make a statement with their subtle shimmer and luxurious feel. Perfect for executives, consultants, and professionals in creative industries.',
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
  {
    id: '5',
    name: 'Copper Foil Accent Card',
    description: 'Stunning business cards with copper foil highlights on dark stock. The warm copper tones create a distinctive and memorable impression, perfect for luxury brands and creative professionals seeking a unique business card.',
    price: 549,
    category: 'foiling'
  },
  {
    id: '6',
    name: 'Quick Glossy Business Card',
    description: 'Vibrant glossy-finished cards with fast turnaround times. These cards feature a high-shine finish that makes colors pop and creates a contemporary, polished look. Ideal for businesses that want to make a bold statement.',
    price: 329,
    category: 'quick'
  },
];

export default Products;
