
import React from 'react';
import { NavLinks } from './NavLinks';
import { AuthButtons } from './AuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
  theme: 'light' | 'dark';
  onClose: () => void;
}

export function MobileMenu({ isOpen, theme, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={`md:hidden mt-4 p-4 rounded-lg border animate-fade-in ${
      theme === 'light' 
        ? 'bg-white border-navy/10 text-navy' 
        : 'bg-navy-light border-white/10 text-white'
    }`}>
      <div className="flex flex-col space-y-4">
        <NavLinks theme={theme} />
        <AuthButtons theme={theme} isMobile={true} onClick={onClose} />
      </div>
    </div>
  );
}
