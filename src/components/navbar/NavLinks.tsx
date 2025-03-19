
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  theme: 'light' | 'dark';
}

export function NavLinks({ theme }: NavLinkProps) {
  const location = useLocation();

  return (
    <>
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
    </>
  );
}
