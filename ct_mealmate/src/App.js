// App.js
// Entry point for MealMate app
// Sets up React Router routes to display pages for viewing, adding, and editing meals

import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMealPage from './pages/AddMealPage';
import EditMealPage from './pages/EditMealPage';
import { MealsProvider } from './context/MealsContext';

function App() {
  return (
    <MealsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-meal" element={<AddMealPage />} />
          <Route path="/edit-meal/:mealId" element={<EditMealPage />} />
        </Routes>
      </BrowserRouter>
    </MealsProvider>
  );
}

export default App;
