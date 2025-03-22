
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight, IndianRupee } from 'lucide-react';
import { products, getCategoryName } from '@/utils/productUtils';

const Products = () => {
  const [filter, setFilter] = useState('all');

  // Create categories array for treatments
  const categories = [
    { id: 'all', name: 'All Cards' },
    { id: 'spot-uv', name: 'Spot UV' },
    { id: 'electroplating', name: 'Electroplating' },
    { id: 'foiling', name: 'Foiling' },
    { id: 'embossing', name: 'Embossing' },
    { id: 'letterpress', name: 'Letterpress' }
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">Our Business Card Collection</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
            Browse our selection of premium business cards, each featuring a unique treatment option.
          </p>
          
          {/* Treatment Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={filter === category.id ? 'default' : 'outline'} 
                className={`rounded-full ${filter === category.id ? 'bg-cyan hover:bg-cyan-light' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white dark:bg-navy-light border-gray-200 dark:border-white/10 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/3] bg-gray-100 dark:bg-navy-dark relative overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                      [Product Image]
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-cyan text-white px-3 py-1 rounded-full text-xs font-medium">
                    {getCategoryName(product.category)}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-navy dark:text-white">{product.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="flex items-center text-lg font-semibold mb-2">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {product.price.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      per {Object.keys(product.pricing)[0] || 100} cards
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">{product.description}</p>
                </CardContent>
                
                <CardFooter className="pt-0">
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

export default Products;
