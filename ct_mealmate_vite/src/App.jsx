// App.jsx
// This file is the main entry point for the React application.

import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { MealsProvider } from "./context/MealsContext";

import AddMealPage from "./pages/AddMealPage";
import EditMealPage from "./pages/EditMealPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import PrivateRoute from "./components/PrivateRoute";
import WelcomePopup from "./components/WelcomePopup";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import "./index.css";

import { useEffect, useState } from "react";

export default function App() {
  return (
    <AuthProvider>
      <MealsProvider>
        <Router>
          <Routes>
            {/* Protected Home Page with WelcomePopup */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomeWithWelcome />
                </PrivateRoute>
              }
            />

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-meal" element={<AddMealPage />} />
            <Route path="/edit-meal/:mealId" element={<EditMealPage />} />
          </Routes>
        </Router>
      </MealsProvider>
    </AuthProvider>
  );
}

// Helper component to handle the WelcomePopup logic
function HomeWithWelcome() {
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup

  // useEffect to show the popup only once based on localStorage
  useEffect(() => {
    // Check if the "showWelcomePopup" flag is set in localStorage
    if (localStorage.getItem("showWelcomePopup") === "true") {
      setShowPopup(true); // Show the popup if the flag is true
      localStorage.removeItem("showWelcomePopup"); // Remove the flag after showing the popup
    }
  }, []);

  return (
    <>
      {showPopup && <WelcomePopup />}
      <HomePage />
    </>
  );
}

// Summary:
// What: This is the main application component, which includes routing and authentication context providers for managing global state.
// Why: The app handles routing to different pages, provides global state management (for authentication and meal data), and ensures that users can only access certain routes if authenticated.
// How: The app uses React Router for route management, AuthProvider and MealsProvider for context-based state, and PrivateRoute to protect routes. The HomeWithWelcome component conditionally shows a welcome popup on the first visit.