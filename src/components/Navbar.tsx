
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { NavLinks } from './navbar/NavLinks';
import { AuthButtons } from './navbar/AuthButtons';
import { CartButton } from './navbar/CartButton';
import { ThemeToggle } from './navbar/ThemeToggle';
import { MobileMenu } from './navbar/MobileMenu';

export function Navbar() {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <NavLinks theme={theme} />
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <CartButton theme={theme} />
            <AuthButtons theme={theme} />
            
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
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          theme={theme} 
          onClose={toggleMobileMenu}
        />
      </div>
    </nav>
  );
}
