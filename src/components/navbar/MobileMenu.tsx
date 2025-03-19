
import React from 'react';
import { NavLinks } from './NavLinks';
import { AuthButtons } from './AuthButtons';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  theme: 'light' | 'dark';
  onClose: () => void;
}

export function MobileMenu({ isOpen, theme, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={`md:hidden fixed inset-x-0 top-[72px] p-4 z-50 animate-fade-in ${
      theme === 'light' 
        ? 'bg-white border-navy/10 text-navy' 
        : 'bg-navy-light border-white/10 text-white'
    }`}>
      <div className="container mx-auto">
        <div className="flex justify-end mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className={theme === 'light' ? 'text-navy' : 'text-white'}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col space-y-4">
          <NavLinks theme={theme} />
          <AuthButtons theme={theme} isMobile={true} onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
