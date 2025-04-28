// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
  
    try {
      const res = await axios.get(`http://localhost:3001/users`, {
        params: { username: cleanUsername, password: cleanPassword },
      });
  
      if (Array.isArray(res.data) && res.data.length > 0) {
        const foundUser = res.data[0];
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      } else {
        console.warn('No user matched login credentials.');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err.message);
      return false;
    }
  };  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Register function
  const register = async (username, password) => {
    try {
      const res = await axios.get('http://localhost:3001/users', {
        params: { username },
      });

      if (res.data.length > 0) {
        // Username already exists
        return { success: false, message: 'Username already taken' };
      }

      const newUser = { username, password };
      const postRes = await axios.post('http://localhost:3001/users', newUser);

      setUser(postRes.data);
      localStorage.setItem('user', JSON.stringify(postRes.data));
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: 'Registration failed' };
    }
  };

  const value = {
    user,
    login,
    logout,
    register, 
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
