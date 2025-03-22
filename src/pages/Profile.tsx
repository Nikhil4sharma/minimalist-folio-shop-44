
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProfileError } from '@/components/profile/ProfileError';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { useProfileData } from '@/hooks/useProfileData';

const Profile = () => {
  const {
    currentUser,
    userProfile,
    orders,
    isLoading,
    isOrdersLoading,
    error,
    isRetrying,
    handleRetry,
    fetchUserProfile
  } = useProfileData();

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  // Show error state
  if (error && !isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy">
        <Navbar />
        <div className="container mx-auto px-4 py-28">
          <ProfileError message={error} onRetry={handleRetry} isRetrying={isRetrying} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      <ProfileContent
        userProfile={userProfile}
        orders={orders}
        currentUser={currentUser}
        isLoading={isLoading}
        isOrdersLoading={isOrdersLoading}
        onProfileUpdated={fetchUserProfile}
      />
      
      <Footer />
    </div>
  );
};

export default Profile;
