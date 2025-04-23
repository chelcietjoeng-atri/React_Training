// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React from 'react';
import { Link } from 'react-router-dom';
import MealList from '../components/MealList';  // Assuming this component displays the list of meals
import { useMeals } from '../context/MealsContext';  // Ensure this is the correct path to the MealsContext

function HomePage() {
  const { meals, deleteMeal } = useMeals();  // Using context here

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
