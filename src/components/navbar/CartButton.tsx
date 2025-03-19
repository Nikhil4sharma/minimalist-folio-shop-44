
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface CartButtonProps {
  theme: 'light' | 'dark';
}

export function CartButton({ theme }: CartButtonProps) {
  const { cartItems } = useCart();
  const cartItemsCount = cartItems.reduce((count, item) => count + 1, 0);

  return (
    <Link to="/cart" className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className={`rounded-full ${
          theme === 'light' 
            ? 'text-navy hover:bg-navy/10' 
            : 'text-white hover:bg-white/10'
        }`}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-cyan text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
