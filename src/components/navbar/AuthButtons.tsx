
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

interface AuthButtonsProps {
  theme: 'light' | 'dark';
  isMobile?: boolean;
  onClick?: () => void;
}

export function AuthButtons({ theme, isMobile, onClick }: AuthButtonsProps) {
  const { currentUser, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    if (onClick) onClick();
  };

  // If user is logged in, show profile and logout buttons
  if (currentUser) {
    return (
      <div className={`${isMobile ? 'flex space-x-2 pt-2' : 'hidden md:flex space-x-2'}`}>
        <Link to="/profile" className={isMobile ? 'flex-1' : ''}>
          <Button 
            variant="outline" 
            className={`${isMobile ? 'w-full' : ''} rounded-full ${
              theme === 'light' 
                ? 'border-navy/20 text-navy hover:bg-navy/10' 
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
            onClick={onClick}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Button 
          className={`${isMobile ? 'w-full' : ''} rounded-full bg-cyan hover:bg-cyan-light text-white`}
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    );
  }

  // If user is not logged in, show login/signup buttons
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
