import React from 'react';
import { Link } from 'react-router-dom';

function AddMealPage() {
  return (
    <div>
      <h1>Add a New Meal</h1>
      <form>
        {/* Form fields will go here later */}
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default AddMealPage;
