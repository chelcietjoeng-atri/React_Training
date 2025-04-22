import React from 'react';
import { useParams, Link } from 'react-router-dom';

function EditMealPage() {
  const { mealId } = useParams();
  return (
    <div>
      <h1>Edit Meal - ID: {mealId}</h1>
      <form>
        {/* Form fields for editing meal will go here later */}
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default EditMealPage;
