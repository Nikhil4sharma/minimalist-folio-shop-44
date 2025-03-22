
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';

interface ProfileErrorProps {
  message: string;
  onRetry: () => void;
}

export const ProfileError: React.FC<ProfileErrorProps> = ({ message, onRetry }) => {
  const isOffline = message.toLowerCase().includes('offline') || 
                   message.toLowerCase().includes('internet') ||
                   message.toLowerCase().includes('unavailable');

  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center py-4">
          {isOffline ? (
            <WifiOff className="h-12 w-12 text-red-500 mb-4" />
          ) : (
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          )}
          
          <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
            Error Loading Profile
          </h3>
          
          <p className="text-red-600 dark:text-red-300 mb-4">
            {message || 'There was an error loading your profile information.'}
          </p>
          
          {isOffline ? (
            <div className="mb-4 text-sm text-red-500 dark:text-red-300">
              <p>Check your connection and try again.</p>
            </div>
          ) : null}
          
          <Button 
            onClick={onRetry}
            className="rounded-full bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
