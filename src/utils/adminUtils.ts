
import { auth, db, setupAdminUser } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Function to check if a user is an admin
export const checkIfUserIsAdmin = async (uid: string): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists() && userSnap.data().role === 'admin') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Function to create admin credentials and login
export const createAndLoginAdmin = async (email: string, password: string): Promise<boolean> => {
  try {
    // Sign in with provided credentials
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Set up admin privileges
    const success = await setupAdminUser(userCredential.user.uid);
    
    return success;
  } catch (error) {
    console.error('Error creating admin user:', error);
    return false;
  }
};

// Admin credentials for testing (normally this would be secured)
export const ADMIN_EMAIL = "admin@cardcraft.com";
export const ADMIN_PASSWORD = "Admin@123";

// Function to get admin credentials
export const getAdminCredentials = () => {
  return {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD
  };
};
