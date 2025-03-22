
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Palette, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSavedDesigns, ErrorResponse } from '@/utils/firebaseUtils';

interface ProfileSavedDesignsProps {
  userId: string;
}

export const ProfileSavedDesigns: React.FC<ProfileSavedDesignsProps> = ({ userId }) => {
  const { theme } = useTheme();
  const [designs, setDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDesigns = async () => {
      setIsLoading(true);
      try {
        const savedDesigns = await getSavedDesigns(userId);
        
        if ('error' in savedDesigns) {
          const errorData = savedDesigns as ErrorResponse;
          setError(errorData.message);
          setDesigns([]);
        } else {
          setDesigns(savedDesigns as any[]);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching saved designs:', err);
        setError('Failed to load your saved designs');
        setDesigns([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDesigns();
  }, [userId]);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Designs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <p>Loading saved designs...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Designs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              {error}
            </p>
            <Button 
              className="rounded-full bg-cyan hover:bg-cyan-light"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Designs</CardTitle>
      </CardHeader>
      <CardContent>
        {designs.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-cyan" />
            </div>
            <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              You don't have any saved designs yet.
            </p>
            <Link to="/products">
              <Button 
                className="rounded-full bg-cyan hover:bg-cyan-light"
              >
                Start Designing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {designs.map((design) => (
              <div 
                key={design.id}
                className={`p-4 rounded-lg border ${
                  theme === 'light' 
                    ? 'border-gray-200 bg-gray-50' 
                    : 'border-gray-700 bg-navy-light'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{design.name || 'Untitled Design'}</p>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      {design.createdAt?.seconds ? new Date(design.createdAt.seconds * 1000).toLocaleDateString() : 'No date'}
                    </p>
                  </div>
                  <Link to={`/design/${design.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
