// context/AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <- New

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // <- Done checking
  }, []);

  const login = async (username, password) => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      const res = await axios.get("http://localhost:3001/users", {
        params: { username: cleanUsername, password: cleanPassword },
      });

      if (Array.isArray(res.data) && res.data.length > 0) {
        const foundUser = res.data[0];
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (username, password) => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      const res = await axios.get("http://localhost:3001/users", {
        params: { username: cleanUsername },
      });

      if (Array.isArray(res.data) && res.data.length > 0) {
        return { success: false, message: "Username already taken" };
      }

      const newUser = { username: cleanUsername, password: cleanPassword };
      const postRes = await axios.post("http://localhost:3001/users", newUser);

      setUser(postRes.data);
      localStorage.setItem("user", JSON.stringify(postRes.data));
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    loading, // <- expose loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
      {/* Only render children after loading */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
