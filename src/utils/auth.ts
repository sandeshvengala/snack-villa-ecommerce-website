import type { User as FirebaseUser } from 'firebase/auth';
import type { User } from '../types';

export const mapFirebaseUserToAppUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || 'Snack Villa User',
  email: firebaseUser.email || '',
  phone: firebaseUser.phoneNumber || '',
  addresses: [],
});
