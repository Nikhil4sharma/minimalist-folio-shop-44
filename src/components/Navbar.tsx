
import { Moon, Sun, ShoppingCart } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full top-0 z-50 glass dark:glass-dark">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="font-playfair text-xl font-bold">
            CardCraft
          </a>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Button variant="outline" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            <Button variant="default" className="rounded-full">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
