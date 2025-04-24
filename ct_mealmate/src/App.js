// App.js
// Entry point for MealMate app
// Sets up React Router routes to display pages for viewing, adding, and editing meals

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MealsProvider } from './context/MealsContext';
import HomePage from './pages/HomePage';
import AddMealPage from './pages/AddMealPage';
import EditMealPage from './pages/EditMealPage';
import WelcomePopup from './components/WelcomePopup';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  return (
    <MealsProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <WelcomePopup />
              <HomePage />
            </>
          } />
          <Route path="/add-meal" element={<AddMealPage />} />
          <Route path="/edit-meal/:mealId" element={<EditMealPage />} />
        </Routes>
      </Router>
    </MealsProvider>
  );
}

export default App;
