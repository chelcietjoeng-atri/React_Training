import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMealPage from './pages/AddMealPage';
import EditMealPage from './pages/EditMealPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-meal" element={<AddMealPage />} />
        <Route path="/edit-meal/:mealId" element={<EditMealPage />} />
      </Routes>
    </Router>
  );
}

export default App;
