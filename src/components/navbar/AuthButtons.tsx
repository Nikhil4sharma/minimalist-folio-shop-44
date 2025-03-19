
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  theme: 'light' | 'dark';
  isMobile?: boolean;
  onClick?: () => void;
}

export function AuthButtons({ theme, isMobile, onClick }: AuthButtonsProps) {
  return (
    <div className={`${isMobile ? 'flex space-x-2 pt-2' : 'hidden md:flex space-x-2'}`}>
      <Link to="/login" className={isMobile ? 'flex-1' : ''}>
        <Button 
          variant="outline" 
          className={`${isMobile ? 'w-full' : ''} rounded-full ${
            theme === 'light' 
              ? 'border-navy/20 text-navy hover:bg-navy/10' 
              : 'border-white/20 text-white hover:bg-white/10'
          }`}
          onClick={onClick}
        >
          Log In
        </Button>
      </Link>
      <Link to="/signup" className={isMobile ? 'flex-1' : ''}>
        <Button 
          className={`${isMobile ? 'w-full' : ''} rounded-full bg-cyan hover:bg-cyan-light text-white`}
          onClick={onClick}
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
