import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>CT's MealMate - Weekly Meal Planner</h1>
      <Link to="/add-meal">Add a New Meal</Link>
      {/* The meal list will go here later */}
    </div>
  );
}

export default HomePage;
