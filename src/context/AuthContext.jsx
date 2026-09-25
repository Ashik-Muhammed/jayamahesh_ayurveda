// Authentication Context for Staff & Admin Portal
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  isFirebaseConfigured,
  auth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from '../services/firebase';
import { INITIAL_STAFF } from '../services/initialData';
import { fetchStaffList } from '../services/storageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('jayamahesh_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const staffList = await fetchStaffList();
          const match = staffList.find(s => s.email.toLowerCase() === user.email.toLowerCase());
          const userObj = {
            uid: user.uid,
            email: user.email,
            name: match ? match.name : user.displayName || user.email.split('@')[0],
            role: match ? match.role : 'staff',
            active: true
          };
          setCurrentUser(userObj);
          localStorage.setItem('jayamahesh_active_user', JSON.stringify(userObj));
        } else {
          // If logged out from Firebase
          if (currentUser && isFirebaseConfigured()) {
            setCurrentUser(null);
            localStorage.removeItem('jayamahesh_active_user');
          }
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. If Firebase is configured, try Firebase Auth
    if (isFirebaseConfigured() && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        const staffList = await fetchStaffList();
        const match = staffList.find(s => s.email.toLowerCase() === normalizedEmail);
        const userObj = {
          uid: cred.user.uid,
          email: cred.user.email,
          name: match ? match.name : normalizedEmail.split('@')[0],
          role: match ? match.role : 'staff',
          active: true
        };
        setCurrentUser(userObj);
        localStorage.setItem('jayamahesh_active_user', JSON.stringify(userObj));
        return { success: true, user: userObj };
      } catch (err) {
        console.error('Firebase Auth sign-in error:', err);
        return { success: false, error: err.message };
      }
    }

    // 2. Local Demo Authentication Fallback
    const staffList = await fetchStaffList();
    const match = staffList.find(s => s.email.toLowerCase() === normalizedEmail);

    if (!match) {
      return { 
        success: false, 
        error: 'Staff email not registered. Try admin@jayamahesh.com, manager@jayamahesh.com, or staff@jayamahesh.com' 
      };
    }

    // For demo mode, any password >= 6 characters or "ayurveda" / "admin123" is accepted
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    const userObj = {
      ...match,
      lastLoginAt: new Date().toISOString()
    };

    setCurrentUser(userObj);
    localStorage.setItem('jayamahesh_active_user', JSON.stringify(userObj));
    return { success: true, user: userObj };
  };

  const logout = async () => {
    if (isFirebaseConfigured() && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Firebase signOut error:', err);
      }
    }
    setCurrentUser(null);
    localStorage.removeItem('jayamahesh_active_user');
  };

  const resetPassword = async (email) => {
    if (isFirebaseConfigured() && auth) {
      try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: 'Password reset link sent to your email.' };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
    return { success: true, message: 'Demo mode: Password reset email simulated for ' + email };
  };

  // Role permissions check based on Section 8 table
  const can = (permission) => {
    if (!currentUser) return false;
    const role = currentUser.role;

    switch (permission) {
      case 'view_appointments':
      case 'confirm_appointments':
        return ['admin', 'manager', 'staff'].includes(role);
      case 'manage_calendar':
      case 'manage_content':
        return ['admin', 'manager'].includes(role);
      case 'manage_staff':
      case 'delete_records':
        return role === 'admin';
      default:
        return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isAuthenticated: Boolean(currentUser),
      isFirebase: isFirebaseConfigured(),
      login,
      logout,
      resetPassword,
      can
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
