
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProfileError } from '@/components/profile/ProfileError';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { useProfileData } from '@/hooks/useProfileData';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
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

  // If user is not logged in, redirect to login
  React.useEffect(() => {
    if (!currentUser && !isLoading) {
      navigate('/login');
    }
  }, [currentUser, isLoading, navigate]);

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
