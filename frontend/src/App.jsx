import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase'; // Corrected import path
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Import Page Components without extensions
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FarmerDashboard from './pages/FarmerDashboard';
import CustomerHomePage from './pages/CustomerHomePage';

// Import Styling
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('login'); // Can be 'login' or 'register'

  // This effect runs once on app startup to check if a user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is signed in, so we get their role from Firestore
        const userDocRef = doc(firestore, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
        setUserRole(null);
        setView('login'); // Default to login page when no user is signed in
      }
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const handleRegister = async (userData) => {
    const { email, password, role, name, username, mobile } = userData;
    try {
      // 1. Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // 2. Create a document in Firestore to store the user's role and other details
      await setDoc(doc(firestore, "users", newUser.uid), {
        email, role, name, username, mobile,
        createdAt: new Date().toISOString()
      });
      
      // 3. Update the state in the app to log the user in
      setUser(newUser);
      setUserRole(role);
      return { success: true };
    } catch (error) {
      console.error("Registration Error:", error);
      return { success: false, message: error.message };
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener will handle setting user and role state automatically
      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: error.message };
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // --- Render Logic ---

  // Show a loading screen while checking authentication status
  if (loading) {
    return <div className="loading-container"><h1>Hasiru Santhe</h1><p>Loading...</p></div>;
  }

  // If there is a logged-in user, show the correct dashboard
  if (user) {
    if (userRole === 'farmer') {
      return <FarmerDashboard farmerId={user.uid} onLogout={handleLogout} />;
    }
    if (userRole === 'customer') {
      return <CustomerHomePage onLogout={handleLogout} />;
    }
    // Fallback while role is being fetched
    return <div className="loading-container">Loading user data...</div>;
  }

  // If no user is logged in, show either the Login or Register page
  if (view === 'register') {
    return <RegisterPage onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />;
  }
  
  // Default view is the login page
  return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
}

export default App;

