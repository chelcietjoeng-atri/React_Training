import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MealsProvider } from './context/MealsContext';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import AddMealPage from './pages/AddMealPage';
import EditMealPage from './pages/EditMealPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import WelcomePopup from './components/WelcomePopup';
import PrivateRoute from './components/PrivateRoute';

import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

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
  return (
    <>
      <WelcomePopup />
      <HomePage />
    </>
  );
}
