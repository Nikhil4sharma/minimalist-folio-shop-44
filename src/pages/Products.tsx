
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight, IndianRupee } from 'lucide-react';
import { products, getCategoryName } from '@/utils/productUtils';

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
            <Button 
              variant={filter === 'embossing' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'embossing' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('embossing')}
            >
              Embossed Cards
            </Button>
            <Button 
              variant={filter === 'letterpress' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'letterpress' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('letterpress')}
            >
              Letterpress Cards
            </Button>
            <Button 
              variant={filter === 'black-premium' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'black-premium' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('black-premium')}
            >
              Black Premium
            </Button>
            <Button 
              variant={filter === 'metal' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'metal' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('metal')}
            >
              Metal Cards
            </Button>
            <Button 
              variant={filter === 'acrylic' ? 'default' : 'outline'} 
              className={`rounded-full ${filter === 'acrylic' ? 'bg-cyan hover:bg-cyan-light' : ''}`}
              onClick={() => setFilter('acrylic')}
            >
              Acrylic Cards
            </Button>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white dark:bg-navy-light border-gray-200 dark:border-white/10 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 dark:bg-navy-dark relative overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                      [Product Image]
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-navy dark:text-white">{product.name}</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    {getCategoryName(product.category)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-lg font-semibold mb-2">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {product.price.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({product.perItemPrice.toLocaleString('en-IN')} per card)
                    </span>
                  </div>
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

export default Products;
