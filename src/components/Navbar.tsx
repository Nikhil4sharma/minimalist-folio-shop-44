
import React, { useState, useEffect } from 'react';
import { Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { useCart } from '@/contexts/CartContext';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Calculate cart items count
  const cartItemsCount = cartItems.reduce((count, item) => count + 1, 0);

  // Define background color based on theme and scroll state
  const getNavbarStyles = () => {
    if (scrolled) {
      return theme === 'light' 
        ? 'bg-white/95 text-navy backdrop-blur-md py-2 border-navy/10' 
        : 'bg-navy/95 text-white backdrop-blur-md py-2 border-white/10';
    } else {
      return theme === 'light'
        ? 'bg-transparent text-navy py-4 border-navy/10'
        : 'bg-transparent text-white py-4 border-white/10';
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${getNavbarStyles()} border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-poppins text-xl font-bold">
            CardCraft
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === '/' 
                  ? 'text-cyan' 
                  : theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`transition-colors ${
                location.pathname === '/products' 
                  ? 'text-cyan' 
                  : theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/customize" 
              className={`transition-colors ${
                location.pathname === '/customize' 
                  ? 'text-cyan' 
                  : theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
              }`}
            >
              Customize
            </Link>
            <Link 
              to="/how-it-works" 
              className={`transition-colors ${
                location.pathname === '/how-it-works' 
                  ? 'text-cyan' 
                  : theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
              }`}
            >
              How It Works
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors ${
                location.pathname === '/contact' 
                  ? 'text-cyan' 
                  : theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
              }`}
            >
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`rounded-full ${
                theme === 'light' 
                  ? 'text-navy hover:bg-navy/10' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            
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
            
            <div className="hidden md:flex space-x-2">
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className={`rounded-full ${
                    theme === 'light' 
                      ? 'border-navy/20 text-navy hover:bg-navy/10' 
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full bg-cyan hover:bg-cyan-light text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`md:hidden rounded-full ${
                theme === 'light' 
                  ? 'text-navy hover:bg-navy/10' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 p-4 rounded-lg border animate-fade-in ${
            theme === 'light' 
              ? 'bg-white border-navy/10 text-navy' 
              : 'bg-navy-light border-white/10 text-white'
          }`}>
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`transition-colors ${
                  theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
                }`} 
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`transition-colors ${
                  theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
                }`} 
                onClick={toggleMobileMenu}
              >
                Products
              </Link>
              <Link 
                to="/customize" 
                className={`transition-colors ${
                  theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
                }`} 
                onClick={toggleMobileMenu}
              >
                Customize
              </Link>
              <Link 
                to="/how-it-works" 
                className={`transition-colors ${
                  theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
                }`} 
                onClick={toggleMobileMenu}
              >
                How It Works
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${
                  theme === 'light' ? 'text-navy hover:text-cyan' : 'text-white hover:text-cyan'
                }`} 
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="flex-1">
                  <Button 
                    variant="outline" 
                    className={`w-full rounded-full ${
                      theme === 'light' 
                        ? 'border-navy/20 text-navy hover:bg-navy/10' 
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`} 
                    onClick={toggleMobileMenu}
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button 
                    className="w-full rounded-full bg-cyan hover:bg-cyan-light text-white" 
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
