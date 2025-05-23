
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { toast } from 'sonner';
import { UserType } from '../utils/mongodb';

// Firebase configuration with a valid API key
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// For console debugging purposes
console.log("Firebase initialized with config:", {
  apiKey: firebaseConfig.apiKey.substring(0, 5) + "...", // Only show part of the key for security
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'recruiter' | 'admin';
  avatar?: string;
  college?: string;
  skills?: string[];
  experience?: string;
  totalPoints?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const saveUserToDatabase = async (userData: User) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleId: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          avatar: userData.avatar,
          totalPoints: userData.totalPoints || 0
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to save user to database:', await response.json());
      } else {
        console.log('User saved to database successfully');
      }
    } catch (error) {
      console.error('Error saving user to database:', error);
    }
  };

  // Mock data for development - setting a default user to ensure the app loads
  useEffect(() => {
    // For development purposes, automatically set a mock user
    const mockUser: User = {
      id: '1',
      email: 'student@example.com',
      name: 'Test Student',
      role: 'student',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      college: 'Tech University',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: 'Fresher',
      totalPoints: 350
    };
    
    // Only set mock user if there's no authenticated user yet
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } else {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check if user exists in MongoDB
          const response = await fetch(`/api/users/${firebaseUser.uid}`);
          
          if (response.ok) {
            // User exists, get user data
            const userData = await response.json();
            const typedUser: User = {
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role as 'student' | 'recruiter' | 'admin',
              avatar: userData.avatar,
              college: userData.college,
              skills: userData.skills,
              experience: userData.experience,
              totalPoints: userData.totalPoints
            };
            setUser(typedUser);
            localStorage.setItem('user', JSON.stringify(typedUser));
          } else {
            // User doesn't exist, create new user with a valid role type
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || 'user@example.com',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              role: 'student', // Explicitly typed as 'student'
              avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || 'User')}&background=random`,
              totalPoints: 0
            };
            
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            // Save the new user to MongoDB
            await saveUserToDatabase(newUser);
            toast.success('Welcome to Jobify! Your account has been created.');
          }
        } catch (error) {
          console.error('Error fetching/creating user:', error);
          // Fallback to firebase user data with a valid role type
          const newUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || 'user@example.com',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            role: 'student',
            avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || 'User')}&background=random`,
            totalPoints: 0
          };
          localStorage.setItem('user', JSON.stringify(newUser));
          setUser(newUser);
        }
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with email & password
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // For demo purposes, we'll use mock data
      // Determine role based on email for demo purposes
      let userRole: 'student' | 'recruiter' | 'admin';
      
      if (email.includes('admin')) {
        userRole = 'admin';
      } else if (email.includes('recruiter')) {
        userRole = 'recruiter';
      } else {
        userRole = 'student';
      }
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: userRole,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`,
        college: 'Tech University',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: 'Fresher',
        totalPoints: 350
      };
      
      // Save the user to MongoDB
      await saveUserToDatabase(mockUser);
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user: firebaseUser } = result;
      
      // Create user object from firebase user
      const newUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || 'user@example.com',
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        role: 'student', // Default role for Google sign-in is student
        avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || 'User')}&background=random`,
        totalPoints: 0
      };
      
      // Save the user to MongoDB
      await saveUserToDatabase(newUser);
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      toast.success('Successfully signed in with Google!');
    } catch (error) {
      console.error('Google login failed:', error);
      toast.error('Google login failed. Please try again.');
      throw new Error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      toast.info('You have been signed out.');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
