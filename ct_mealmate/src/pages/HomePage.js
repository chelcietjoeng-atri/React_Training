// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React from 'react';
import { Link } from 'react-router-dom';
import MealList from '../components/MealList';
import { useMeals } from '../context/MealsContext';

function HomePage() {
  const { meals, deleteMeal } = useMeals();

  return (
    <div>
      <h1>🍽️ CT's MealMate - Weekly Meal Planner</h1>

      <Link to="/add-meal">➕ Add a New Meal</Link>

      {/* Pass real state + delete action */}
      <MealList meals={meals} onDelete={deleteMeal} />
    </div>
  );
}

export default HomePage;
