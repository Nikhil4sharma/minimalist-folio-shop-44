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
    // Set a timeout to prevent infinite loading
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Profile request timed out')), 10000);
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
      return null;
    };

    // Race the fetch against the timeout
    const result = await Promise.race([fetchProfile(), timeoutPromise]);
    return result;
  } catch (error) {
    console.error('Error getting user profile:', error);
    // Return an error object instead of null, to differentiate between "no profile" and "error"
    return { error: true, message: error instanceof Error ? error.message : 'Unknown error fetching profile' };
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
