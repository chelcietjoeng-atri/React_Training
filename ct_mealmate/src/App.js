// App.js
// Entry point for MealMate app
// Sets up React Router routes to display pages for viewing, adding, and editing meals

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMealPage from './pages/AddMealPage';
import EditMealPage from './pages/EditMealPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for viewing all meals */}
        <Route path="/" element={<HomePage />} />

        {/* Route for adding a new meal */}
        <Route path="/add-meal" element={<AddMealPage />} />

        {/* Route for editing a specific meal (based on ID) */}
        <Route path="/edit-meal/:mealId" element={<EditMealPage />} />
      </Routes>
    </Router>
  );
}

export default App;
