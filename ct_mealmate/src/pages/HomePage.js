// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React from 'react';
import { Link } from 'react-router-dom';
import MealList from '../components/MealList';

// Static sample data for now
const sampleMeals = [
  { id: 1, name: "Grilled Chicken Bowl", type: "Lunch", day: "Monday", favorite: true },
  { id: 2, name: "Avocado Toast", type: "Breakfast", day: "Tuesday", favorite: false },
  { id: 3, name: "Spaghetti Bolognese", type: "Dinner", day: "Wednesday", favorite: true },
];

function HomePage() {
  return (
    <div>
      <h1>🍽️ CT's MealMate - Weekly Meal Planner</h1>

      <Link to="/add-meal">➕ Add a New Meal</Link>

      {/* Meal Table using React Table */}
      <MealList meals={sampleMeals} />
    </div>
  );
}

export default HomePage;
