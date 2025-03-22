
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { products, getCategoryName } from '@/utils/productUtils';
import { ProductDetailContent } from '@/components/product-detail/ProductDetailContent';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Find the product by ID or use the first product as fallback
  const product = products.find(p => p.id === id) || products[0];
  
  // Simplified state management
  const [selectedGSM, setSelectedGSM] = useState('350');
  const [selectedQuantity, setSelectedQuantity] = useState('100');
  
  // Set default GSM based on product details
  useEffect(() => {
    if (product && product.details && product.details.paperWeight) {
      const gsm = product.details.paperWeight.includes('600') ? '600' : '350';
      setSelectedGSM(gsm);
    }
    
    if (product && product.details && product.details.quantity) {
      setSelectedQuantity(product.details.quantity.toString());
    }
  }, [product]);
  
  // Calculate pricing
  const calculatePricing = () => {
    const baseUnitPrice = product.price / parseInt(selectedQuantity);
    const gsmMultiplier = selectedGSM === '600' ? 1.2 : 1;
    
    const perCardPrice = baseUnitPrice * gsmMultiplier;
    const totalPrice = perCardPrice * parseInt(selectedQuantity);
    
    return {
      perCardPrice,
      totalPrice
    };
  };
  
  const pricing = calculatePricing();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      quantity: parseInt(selectedQuantity),
      gsm: selectedGSM,
      price: pricing.perCardPrice,
      totalPrice: pricing.totalPrice,
      size: 'standard',
      paperType: 'matt',
      foilpress: 'none',
      embossing: 'none',
      edgepaint: 'none',
      electroplatingFront: 'none',
      electroplatingBack: 'none',
      hasDesign: false
    });

    toast({
      title: "Product added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400">
            <button onClick={() => navigate('/products')} className="hover:text-cyan">Products</button>
            <span className="mx-2">/</span>
            <span className="text-cyan">{product.name}</span>
          </nav>
          
          <ProductDetailContent
            productImage={product.image}
            productName={product.name}
            productCategory={getCategoryName(product.category)}
            productDescription={product.description}
            basePrice={product.price}
            options={{
              selectedGSM,
              selectedQuantity
            }}
            setters={{
              setSelectedGSM,
              setSelectedQuantity
            }}
            pricing={pricing}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
