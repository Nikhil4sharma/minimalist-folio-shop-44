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
  serverTimestamp,
  setDoc
} from 'firebase/firestore';

export interface UserProfile {
  id?: string;
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
  addresses: Address[];
  createdAt: any;
  updatedAt: any;
}

export interface Address {
  id?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface Order {
  id?: string;
  userId: string;
  items: any[];
  total: number;
  status: string;
  shippingAddress: Address;
  paymentMethod: string;
  date?: any;
  createdAt?: any;
  updatedAt?: any;
}

export interface ErrorResponse {
  error: boolean;
  message: string;
  code: string;
}

export const createUserProfile = async (userId: string, userData: any): Promise<boolean | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }
    
    const existingProfile = await getUserProfile(userId);
    
    if (existingProfile && !('error' in existingProfile)) {
      if (existingProfile.id) {
        await updateUserProfile(existingProfile.id, userData);
        return true;
      }
    }
    
    await addDoc(collection(db, 'userProfiles'), {
      userId,
      ...userData,
      addresses: userData.addresses || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Error creating profile', 
      code: 'CREATE_ERROR' 
    };
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }

    const timeoutPromise = new Promise<ErrorResponse>((_, reject) => {
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
        } as UserProfile;
      }
      
      const newProfile = {
        userId,
        name: '',
        email: '',
        addresses: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'userProfiles'), newProfile);
      return { 
        id: docRef.id,
        ...newProfile
      } as UserProfile;
    };

    try {
      const result = await Promise.race([fetchProfile(), timeoutPromise]);
      return result;
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        return error as ErrorResponse;
      }
      
      return { 
        error: true, 
        message: error instanceof Error ? error.message : 'Error fetching profile data', 
        code: 'UNKNOWN'
      };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string, message?: string };
      
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
      } as ErrorResponse;
    }
    
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Unknown error fetching profile', 
      code: 'ERROR' 
    };
  }
};

export const updateUserProfile = async (profileId: string, data: any): Promise<boolean | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }
    
    const profileRef = doc(db, 'userProfiles', profileId);
    await updateDoc(profileRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Error updating profile', 
      code: 'UPDATE_ERROR' 
    };
  }
};

export const addAddressToProfile = async (profileId: string, address: Address): Promise<boolean | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }
    
    const profileRef = doc(db, 'userProfiles', profileId);
    const profileSnap = await getDoc(profileRef);
    
    if (!profileSnap.exists()) {
      return { 
        error: true, 
        message: 'Profile not found', 
        code: 'NOT_FOUND' 
      };
    }
    
    const profileData = profileSnap.data();
    const addresses = Array.isArray(profileData.addresses) ? profileData.addresses : [];
    
    const newAddress = {
      ...address,
      id: address.id || `addr_${Date.now()}`
    };
    
    if (addresses.length === 0 || newAddress.isDefault) {
      newAddress.isDefault = true;
      addresses.forEach(addr => {
        if (addr.id !== newAddress.id) {
          addr.isDefault = false;
        }
      });
    }
    
    addresses.push(newAddress);
    
    await updateDoc(profileRef, {
      addresses: addresses,
      updatedAt: serverTimestamp(),
    });
    
    return true;
  } catch (error) {
    console.error('Error adding address:', error);
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Error adding address', 
      code: 'ADDRESS_ERROR' 
    };
  }
};

export const removeAddress = async (profileId: string, addressId: string): Promise<boolean | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }
    
    const profileRef = doc(db, 'userProfiles', profileId);
    const profileSnap = await getDoc(profileRef);
    
    if (!profileSnap.exists()) {
      return { 
        error: true, 
        message: 'Profile not found', 
        code: 'NOT_FOUND' 
      };
    }
    
    const profileData = profileSnap.data();
    let addresses = Array.isArray(profileData.addresses) ? profileData.addresses : [];
    
    addresses = addresses.filter((addr: Address) => addr.id !== addressId);
    
    if (addresses.length > 0) {
      const hasDefault = addresses.some((addr: Address) => addr.isDefault);
      if (!hasDefault) {
        addresses[0].isDefault = true;
      }
    }
    
    await updateDoc(profileRef, {
      addresses: addresses,
      updatedAt: serverTimestamp(),
    });
    
    return true;
  } catch (error) {
    console.error('Error removing address:', error);
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Error removing address', 
      code: 'ADDRESS_ERROR' 
    };
  }
};

export const createOrder = async (userId: string, orderData: any): Promise<{ success: boolean, orderId?: string, error?: any }> => {
  try {
    if (!navigator.onLine) {
      return { 
        success: false, 
        error: {
          message: 'You are offline. Please check your internet connection and try again.',
          code: 'OFFLINE'
        }
      };
    }
    
    const orderToSave = {
      userId,
      ...orderData,
      status: 'pending',
      date: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const result = await addDoc(collection(db, 'orders'), orderToSave);
    return { success: true, orderId: result.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { 
      success: false, 
      error: { 
        message: error instanceof Error ? error.message : 'Error creating order',
        code: 'ORDER_ERROR'
      } 
    };
  }
};

export const getOrders = async (userId: string): Promise<Order[] | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }

    const q = query(
      collection(db, 'orders'), 
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    
    return orders.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      const dateA = a.date?.seconds ? a.date.seconds : a.date;
      const dateB = b.date?.seconds ? b.date.seconds : b.date;
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string, message?: string };
      
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
      } as ErrorResponse;
    }
    
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Error retrieving orders', 
      code: 'ERROR' 
    };
  }
};

export const getOrderDetails = async (orderId: string): Promise<Order | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }
    
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (orderDoc.exists()) {
      const data = orderDoc.data();
      return { 
        id: orderDoc.id, 
        userId: data.userId || '',
        items: data.items || [],
        total: data.total || 0,
        status: data.status || 'unknown',
        shippingAddress: data.shippingAddress || {},
        paymentMethod: data.paymentMethod || '',
        date: data.date,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as Order;
    }
    return { 
      error: true, 
      message: 'Order not found', 
      code: 'NOT_FOUND' 
    };
  } catch (error) {
    console.error('Error getting order details:', error);
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Error retrieving order details', 
      code: 'ERROR' 
    };
  }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
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

export const saveDesign = async (userId: string, designData: any): Promise<{ success: boolean, designId?: string, error?: any }> => {
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

export const getSavedDesigns = async (userId: string): Promise<any[] | ErrorResponse> => {
  try {
    if (!navigator.onLine) {
      return { 
        error: true, 
        message: 'You are offline. Please check your internet connection and try again.',
        code: 'OFFLINE'
      };
    }
    
    const q = query(collection(db, 'savedDesigns'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting saved designs:', error);
    return { 
      error: true, 
      message: error instanceof Error ? error.message : 'Error retrieving saved designs', 
      code: 'ERROR' 
    };
  }
};

export const updateSavedDesign = async (designId: string, data: any): Promise<boolean> => {
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

export const deleteSavedDesign = async (designId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'savedDesigns', designId));
    return true;
  } catch (error) {
    console.error('Error deleting saved design:', error);
    return false;
  }
};
