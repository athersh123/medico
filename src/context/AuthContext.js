
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data and token on component mount
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('medicor_user');
        const storedToken = localStorage.getItem('medicor_token');
        
        console.log('Auth: Checking stored credentials...');
        console.log('Auth: Has stored user:', !!storedUser);
        console.log('Auth: Has stored token:', !!storedToken);
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          console.log('Auth: Restoring user session for:', parsedUser.email);
          setUser(parsedUser);
        } else {
          console.log('Auth: No stored credentials found');
        }
      } catch (error) {
        console.error('Auth: Error restoring session:', error);
        // Clear invalid data
        localStorage.removeItem('medicor_user');
        localStorage.removeItem('medicor_token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async ({ email, password }) => {
    try {
      console.log('Auth: Attempting login for:', email);
      const response = await authAPI.login({ email, password });
      
      console.log('Auth: Login response:', response);
      
      if (response.user && response.token) {
        console.log('Auth: Login successful, storing credentials');
        setUser(response.user);
        localStorage.setItem('medicor_user', JSON.stringify(response.user));
        localStorage.setItem('medicor_token', response.token);
        return { success: true, user: response.user };
      } else {
        console.log('Auth: Login failed - no user or token in response');
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Auth: Login error:', error);
      
      // Extract error message from different possible formats
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      console.log('Auth: Login error message:', errorMessage);
      
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const logout = () => {
    console.log('Auth: Logging out user');
    setUser(null);
    localStorage.removeItem('medicor_user');
    localStorage.removeItem('medicor_token');
  };

  const signup = async ({ name, email, password }) => {
    try {
      console.log('Auth: Attempting signup for:', email);
      const response = await authAPI.signup({ name, email, password });
      
      console.log('Auth: Signup response:', response);
      
      if (response.user && response.token) {
        console.log('Auth: Signup successful, storing credentials and logging in');
        setUser(response.user);
        localStorage.setItem('medicor_user', JSON.stringify(response.user));
        localStorage.setItem('medicor_token', response.token);
        return { success: true, user: response.user };
      } else {
        console.log('Auth: Signup failed - no user or token in response');
        return { success: false, message: response.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Auth: Signup error:', error);
      
      // Extract error message from different possible formats
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      console.log('Auth: Signup error message:', errorMessage);
      
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 