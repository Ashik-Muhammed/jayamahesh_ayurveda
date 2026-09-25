// Firebase Configuration & Initialization Service
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';

const STORAGE_KEY = 'jayamahesh_firebase_config';

// Helper to get saved or env configuration
export function getFirebaseConfig() {
  const localSaved = localStorage.getItem(STORAGE_KEY);
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    } catch {
      // ignore JSON parse error
    }
  }

  // Fallback to Vite env variables if provided
  const envConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig;
  }

  return null;
}

export function saveFirebaseConfig(config) {
  if (!config) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

let firebaseApp = null;
let authInstance = null;
let dbInstance = null;

const currentConfig = getFirebaseConfig();

if (currentConfig && currentConfig.apiKey) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(currentConfig) : getApp();
    authInstance = getAuth(firebaseApp);
    dbInstance = getFirestore(firebaseApp);
  } catch (err) {
    console.warn('Firebase initialization error, running in local fallback mode:', err);
  }
}

export const isFirebaseConfigured = () => Boolean(firebaseApp && authInstance && dbInstance);

export {
  firebaseApp,
  authInstance as auth,
  dbInstance as db,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp
};
