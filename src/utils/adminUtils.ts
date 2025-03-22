
import { auth, db } from '@/config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

// Local implementation of setupAdminUser function
const setupAdminUser = async (uid: string): Promise<boolean> => {
  try {
    await setDoc(doc(db, 'users', uid), {
      role: 'admin',
      createdAt: new Date(),
    });
    console.log('Admin user created successfully');
    return true;
  } catch (error) {
    console.error('Error creating admin user:', error);
    return false;
  }
};

// Function to create admin credentials and login
export const createAndLoginAdmin = async (email: string, password: string): Promise<boolean> => {
  try {
    let userCredential;
    
    try {
      // Try to sign in first
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (signInError: any) {
      // If sign in fails with auth/user-not-found, create the user
      if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
        // Create the admin user
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('New admin user created');
      } else {
        // If it's another error, throw it
        throw signInError;
      }
    }
    
    // Set up admin privileges
    const success = await setupAdminUser(userCredential.user.uid);
    
    return success;
  } catch (error) {
    console.error('Error creating/signing in admin user:', error);
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
