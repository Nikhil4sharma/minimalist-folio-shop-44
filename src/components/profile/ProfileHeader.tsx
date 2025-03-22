
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/ThemeProvider';

interface ProfileHeaderProps {
  name: string;
  email: string;
  isLoading: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, isLoading }) => {
  const { theme } = useTheme();
  const initials = name 
    ? name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)
    : '??';

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-cyan">
            <AvatarFallback className="bg-cyan text-white text-xl">
              {isLoading ? '...' : initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {isLoading ? 'Loading...' : name || 'Welcome'}
            </h1>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              {isLoading ? 'Loading...' : email || 'No email provided'}
            </p>
            
            <div className="mt-2">
              <Badge variant="outline" className="bg-cyan/10 text-cyan border-cyan mr-2">
                Customer
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
