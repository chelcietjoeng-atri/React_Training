// AddMealPage.js
// Page to add a new meal - form UI to be built later

import React from 'react';
import { Link } from 'react-router-dom';

function AddMealPage() {
  return (
    <div>
      <h1>➕ Add a New Meal</h1>

      {/* Placeholder for meal form */}
      <p>[Form to create a meal will be added here]</p>

      {/* Link to go back to home */}
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default AddMealPage;
