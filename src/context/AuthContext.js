
import React, { createContext, useContext, useState, useEffect } from 'react';
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
    // Check for stored user data
    const storedUser = localStorage.getItem('medicor_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  // Store users in localStorage as an array
  const getUsers = () => {
    const users = localStorage.getItem('medicor_users');
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('medicor_users', JSON.stringify(users));
  };

  const login = async ({ email, password }) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('medicor_user', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicor_user');
  };

  const signup = async ({ name, email, password }) => {
    let users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    setUser(newUser);
    localStorage.setItem('medicor_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
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