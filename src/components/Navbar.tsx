
import React, { useState } from 'react';
import { Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-poppins text-xl font-bold text-white">
            CardCraft
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-cyan transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-cyan transition-colors">
              Products
            </Link>
            <Link to="/customize" className="text-white hover:text-cyan transition-colors">
              Customize
            </Link>
            <Link to="/how-it-works" className="text-white hover:text-cyan transition-colors">
              How It Works
            </Link>
            <Link to="/contact" className="text-white hover:text-cyan transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-white hover:bg-white/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            
            <div className="hidden md:flex space-x-2">
              <Link to="/login">
                <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10">
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
              className="md:hidden rounded-full text-white hover:bg-white/10"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-light mt-4 p-4 rounded-lg border border-white/10 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-cyan transition-colors" onClick={toggleMobileMenu}>
                Home
              </Link>
              <Link to="/products" className="text-white hover:text-cyan transition-colors" onClick={toggleMobileMenu}>
                Products
              </Link>
              <Link to="/customize" className="text-white hover:text-cyan transition-colors" onClick={toggleMobileMenu}>
                Customize
              </Link>
              <Link to="/how-it-works" className="text-white hover:text-cyan transition-colors" onClick={toggleMobileMenu}>
                How It Works
              </Link>
              <Link to="/contact" className="text-white hover:text-cyan transition-colors" onClick={toggleMobileMenu}>
                Contact
              </Link>
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10" onClick={toggleMobileMenu}>
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button className="w-full rounded-full bg-cyan hover:bg-cyan-light text-white" onClick={toggleMobileMenu}>
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
