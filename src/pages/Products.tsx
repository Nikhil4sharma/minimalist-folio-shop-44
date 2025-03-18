
import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <ThemeProvider>
      <div className="min-h-screen bg-navy text-white">
        <Navbar />
        
        <section className="pt-28 pb-8 px-4">
          <div className="container mx-auto">
            <h1 className="h2 mb-4">Our Business Card Collection</h1>
            <p className="body-text text-gray-300 mb-8">
              Browse our selection of premium business cards, each designed with quality and professionalism in mind.
            </p>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                className="rounded-full" 
                onClick={() => setFilter('all')}
              >
                All Cards
              </Button>
              <Button 
                variant={filter === 'foiling' ? 'default' : 'outline'} 
                className="rounded-full" 
                onClick={() => setFilter('foiling')}
              >
                Foiling Cards
              </Button>
              <Button 
                variant={filter === 'quick' ? 'default' : 'outline'} 
                className="rounded-full" 
                onClick={() => setFilter('quick')}
              >
                Quick Cards
              </Button>
              <Button 
                variant={filter === 'electroplating' ? 'default' : 'outline'} 
                className="rounded-full" 
                onClick={() => setFilter('electroplating')}
              >
                Electroplating Cards
              </Button>
              <Button 
                variant={filter === 'spot-uv' ? 'default' : 'outline'} 
                className="rounded-full" 
                onClick={() => setFilter('spot-uv')}
              >
                Spot UV Cards
              </Button>
            </div>
            
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card key={product.id} className="bg-navy-light border border-white/10 overflow-hidden">
                  <div className="aspect-[4/3] bg-navy-dark relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      [Product Image]
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{product.name}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {getCategoryName(product.category)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-white">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link to={`/products/${product.id}`}>
                      <Button variant="outline" className="rounded-full border-white/20">
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/customize/${product.id}`}>
                      <Button className="rounded-full bg-cyan hover:bg-cyan-light group">
                        Customize
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
    description: 'Elegant business card with gold foil accents on premium paper stock.',
    price: 49.99,
    category: 'foiling'
  },
  {
    id: '2',
    name: 'Quick Matte Business Card',
    description: 'Professional matte-finished cards delivered in 2-3 business days.',
    price: 29.99,
    category: 'quick'
  },
  {
    id: '3',
    name: 'Silver Electroplated Edge Card',
    description: 'Luxury cards with silver electroplated edges for a sophisticated look.',
    price: 59.99,
    category: 'electroplating'
  },
  {
    id: '4',
    name: 'Spot UV Gloss Highlight Card',
    description: 'Premium cards with strategic glossy UV highlights over a matte base.',
    price: 39.99,
    category: 'spot-uv'
  },
  {
    id: '5',
    name: 'Copper Foil Accent Card',
    description: 'Stunning business cards with copper foil highlights on dark stock.',
    price: 54.99,
    category: 'foiling'
  },
  {
    id: '6',
    name: 'Quick Glossy Business Card',
    description: 'Vibrant glossy-finished cards with fast turnaround times.',
    price: 32.99,
    category: 'quick'
  },
];

export default Products;
