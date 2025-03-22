import { db } from '@/config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';

// User-related functions
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await addDoc(collection(db, 'userProfiles'), {
      userId,
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    // Check if online first
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }

    // Set a timeout to prevent infinite loading
    const timeoutPromise = new Promise<{ error: true, message: string, code: string }>((_, reject) => {
      setTimeout(() => {
        reject({ 
          error: true, 
          message: 'Profile request timed out. Please try again later.', 
          code: 'TIMEOUT' 
        });
      }, 10000);
    });

    const fetchProfile = async () => {
      const q = query(collection(db, 'userProfiles'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Convert Firestore document to UserProfile type with all properties
        const data = querySnapshot.docs[0].data();
        return { 
          id: querySnapshot.docs[0].id, 
          userId: data.userId,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          addresses: Array.isArray(data.addresses) ? data.addresses : [],
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      }
      
      // No profile found
      return null;
    };

    // Race the fetch against the timeout
    try {
      const result = await Promise.race([fetchProfile(), timeoutPromise]);
      return result;
    } catch (error) {
      // This catch will handle the rejection from timeoutPromise
      if (error && typeof error === 'object' && 'code' in error) {
        return error;
      }
      
      // Handle other errors
      return { 
        error: true, 
        message: error instanceof Error ? error.message : 'Error fetching profile data', 
        code: 'UNKNOWN'
      };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    
    // Check if it's a Firebase error with a code
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string, message?: string };
      
      // Handle specific Firebase error codes
      if (firebaseError.code === 'unavailable') {
        return { 
          error: true, 
          message: 'Firebase is currently unavailable. You may be offline.', 
          code: 'FIREBASE_UNAVAILABLE' 
        };
      }
      
      return { 
        error: true, 
        message: firebaseError.message || 'Firebase error occurred', 
        code: firebaseError.code 
      };
    }
    
    // Generic error
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Unknown error fetching profile', 
      code: 'ERROR' 
    };
  }
};

export const updateUserProfile = async (profileId: string, data: any) => {
  try {
    const profileRef = doc(db, 'userProfiles', profileId);
    await updateDoc(profileRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

// Order-related functions
export const createOrder = async (userId: string, orderData: any) => {
  try {
    const result = await addDoc(collection(db, 'orders'), {
      userId,
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, orderId: result.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error };
  }
};

export const getOrders = async (userId: string) => {
  try {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export const getOrderDetails = async (orderId: string) => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (orderDoc.exists()) {
      return { id: orderDoc.id, ...orderDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting order details:', error);
    return null;
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};

// Saved designs functions
export const saveDesign = async (userId: string, designData: any) => {
  try {
    const result = await addDoc(collection(db, 'savedDesigns'), {
      userId,
      ...designData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, designId: result.id };
  } catch (error) {
    console.error('Error saving design:', error);
    return { success: false, error };
  }
};

export const getSavedDesigns = async (userId: string) => {
  try {
    const q = query(collection(db, 'savedDesigns'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const designs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return designs;
  } catch (error) {
    console.error('Error getting saved designs:', error);
    return [];
  }
};

export const updateSavedDesign = async (designId: string, data: any) => {
  try {
    const designRef = doc(db, 'savedDesigns', designId);
    await updateDoc(designRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating saved design:', error);
    return false;
  }
};

export const deleteSavedDesign = async (designId: string) => {
  try {
    await deleteDoc(doc(db, 'savedDesigns', designId));
    return true;
  } catch (error) {
    console.error('Error deleting saved design:', error);
    return false;
  }
};
