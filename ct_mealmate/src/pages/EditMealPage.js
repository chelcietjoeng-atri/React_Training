// EditMealPage.js
// Page to edit a meal based on the :mealId route param

import React from 'react';
import { useParams, Link } from 'react-router-dom';

function EditMealPage() {
  // Pull mealId from route
  const { mealId } = useParams();

  return (
    <div>
      <h1>✏️ Edit Meal</h1>

      {/* Display the mealId we are editing */}
      <p>Editing Meal ID: <strong>{mealId}</strong></p>

      {/* Placeholder for edit form */}
      <p>[Form to edit this meal will go here]</p>

      {/* Back navigation */}
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default EditMealPage;
