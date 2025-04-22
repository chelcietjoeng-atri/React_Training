// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>🍽️ CT's MealMate - Weekly Meal Planner</h1>

      {/* Link to add new meal */}
      <Link to="/add-meal">➕ Add a New Meal</Link>

      {/* Placeholder for meal table */}
      <p>[Meal table will go here]</p>
    </div>
  );
}

export default HomePage;
