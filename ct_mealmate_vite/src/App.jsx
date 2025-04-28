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

// Separate HomeWithWelcome as a cleaner pattern
function HomeWithWelcome() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showWelcomePopup") === "true") {
      setShowPopup(true);
      localStorage.removeItem("showWelcomePopup");
    }
  }, []);

  return (
    <>
      {showPopup && <WelcomePopup />}
      <HomePage />
    </>
  );
}
