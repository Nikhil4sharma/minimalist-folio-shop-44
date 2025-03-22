
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { products, getCategoryName } from '@/utils/productUtils';
import { ProductDetailContent } from '@/components/product-detail/ProductDetailContent';
import { useProductOptions } from '@/hooks/useProductOptions';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  // Find the product by ID or use the first product as fallback
  const product = products.find(p => p.id === id) || products[0];
  
  // Base price for price calculations
  const basePrice = product.price / parseInt(Object.keys(product.pricing)[0]);
  
  // Use our custom hook for all product options and pricing
  const { options, setters, pricing, setProductDefaults } = useProductOptions(basePrice, product.category);

  // Set default options based on product details
  useEffect(() => {
    if (product && product.details) {
      setProductDefaults(
        product.details.paperWeight,
        product.details.paperType
      );
    }
  }, [product]);
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      quantity: parseInt(options.selectedQuantity),
      gsm: options.selectedGSM,
      price: pricing.perCardPrice,
      totalPrice: pricing.totalPrice,
      size: options.selectedSize,
      foilpress: options.selectedFoilpress,
      embossing: options.selectedEmbossing,
      edgepaint: options.selectedEdgepaint,
      electroplatingFront: options.selectedElectroplatingFront,
      electroplatingBack: options.selectedElectroplatingBack,
      paperType: options.selectedPaperType,
      hasDesign: options.hasDesign,
      designType: options.hasDesign ? options.designType : undefined
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <ProductDetailContent
            productImage={product.image}
            productName={product.name}
            productCategory={getCategoryName(product.category)}
            productDescription={product.description}
            basePrice={product.price}
            options={options}
            setters={setters}
            pricing={{
              ...pricing,
              basePrice
            }}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
