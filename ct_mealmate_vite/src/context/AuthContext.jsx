// AuthContext.js
// Centralized authentication context for managing login, logout, registration, and user state.

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the auth context object
const AuthContext = createContext();

// Provider component that wraps the app and shares auth state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Holds the logged-in user object
  const [loading, setLoading] = useState(true); // Prevents rendering children until auth check is done

  // On first load, retrieve user from localStorage (persistent login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore session
    }
    setLoading(false); // Finished checking local storage
  }, []);

  // Login function — authenticates against mock backend (json-server)
  const login = async (username, password) => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      const res = await axios.get(`http://localhost:3001/users`, {
        params: { username: cleanUsername, password: cleanPassword },
      });

      if (Array.isArray(res.data) && res.data.length > 0) {
        const foundUser = res.data[0];
        setUser(foundUser); // Set context state
        localStorage.setItem("user", JSON.stringify(foundUser)); // Persist session

        // Trigger welcome popup after login
        localStorage.setItem("showWelcomePopup", "true");

        return true;
      } else {
        console.warn("No user matched login credentials.");
        return false;
      }
    } catch (err) {
      console.error("Login error:", err.message);
      return false;
    }
  };

  // Logout function — clears context and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Register function — checks for existing username then creates a new user
  const register = async (username, password) => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      const res = await axios.get("http://localhost:3001/users", {
        params: { username: cleanUsername },
      });

      // If user already exists, return early
      if (Array.isArray(res.data) && res.data.length > 0) {
        return { success: false, message: "Username already taken" };
      }

      // Register the new user
      const newUser = { username: cleanUsername, password: cleanPassword };
      const postRes = await axios.post("http://localhost:3001/users", newUser);

      setUser(postRes.data); // Log in user immediately
      localStorage.setItem("user", JSON.stringify(postRes.data));
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  };

  // Value provided to all components that use this context
  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user, // Boolean for auth checks
    loading, // Indicates whether we’re still checking login state
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
      {/* Only render children after loading */}
    </AuthContext.Provider>
  );
}

// Custom hook to consume AuthContext easily
export function useAuth() {
  return useContext(AuthContext);
}

// Summary:
// What: A reusable and centralized authentication provider using React Context, with functions for login, logout, and registration.
// Why: It avoids prop-drilling and lets any component easily access or update auth-related data using useAuth().
// Why localStorage: To persist the user session between page reloads.
// Why loading state exists: To prevent components (like routes or UI) from rendering before we know if the user is already logged in.
// Why the popup flag is stored here: After login, we store a flag (showWelcomePopup) in localStorage so that the WelcomePopup can conditionally show based on that.