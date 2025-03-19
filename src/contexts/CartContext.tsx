
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export type CardSize = 'standard' | 'us' | 'square';
export type TreatmentOption = 'none' | 'single' | 'both';
export type PaperType = 'matt' | 'soft-suede' | 'mohawk' | 'keycolor' | 'cotton';
export type ElectroplatingOption = 'none' | 'gold' | 'silver' | 'copper' | 'rose-gold' | 'upto-1' | 'upto-2' | 'upto-3';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  gsm: string;
  price: number;
  totalPrice: number;
  size: CardSize;
  foilpress: TreatmentOption;
  embossing: TreatmentOption;
  edgepaint: TreatmentOption;
  electroplatingFront: ElectroplatingOption;
  electroplatingBack: ElectroplatingOption;
  paperType: PaperType;
  hasDesign: boolean;
  designType?: 'upload' | 'expert';
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping] = useState(99);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate subtotal
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setSubtotal(newSubtotal);
    
    // Calculate tax (GST 18%)
    const newTax = newSubtotal * 0.18;
    setTax(newTax);
    
    // Calculate total
    setTotal(newSubtotal + shipping + newTax);
  }, [cartItems, shipping]);

  const addToCart = (item: CartItem) => {
    // Check if item already exists
    const existingItem = cartItems.find(cartItem => 
      cartItem.id === item.id && 
      cartItem.gsm === item.gsm && 
      cartItem.size === item.size &&
      cartItem.foilpress === item.foilpress &&
      cartItem.embossing === item.embossing &&
      cartItem.edgepaint === item.edgepaint &&
      cartItem.electroplatingFront === item.electroplatingFront &&
      cartItem.electroplatingBack === item.electroplatingBack &&
      cartItem.paperType === item.paperType
    );

    if (existingItem) {
      // Update quantity of existing item
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === existingItem.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
                totalPrice: (cartItem.quantity + item.quantity) * cartItem.price
              }
            : cartItem
        )
      );
    } else {
      // Add new item
      setCartItems([...cartItems, item]);
    }
    
    // Show notification
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
      duration: 3000,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity, totalPrice: quantity * item.price }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        tax,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
