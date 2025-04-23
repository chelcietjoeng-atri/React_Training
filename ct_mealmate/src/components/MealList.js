// MealList.js
// Displays a table of meals using React Table

// MealList.js
import React from 'react';
import { Link } from 'react-router-dom';

function MealList({ meals, onDelete }) {
  if (meals.length === 0) {
    return <p className="mt-4 text-gray-600">No meals added yet.</p>;
  }

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Meal Name</th>
          <th className="border border-gray-300 px-4 py-2">Day</th>
          <th className="border border-gray-300 px-4 py-2">Category</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {meals.map((meal) => (
          <tr key={meal.id}>
            <td className="border px-4 py-2">{meal.name}</td>
            <td className="border px-4 py-2">{meal.day}</td>
            <td className="border px-4 py-2">{meal.category}</td>
            <td className="border px-4 py-2">
              <Link to={`/edit-meal/${meal.id}`} className="text-blue-600 hover:underline mr-4">
                Edit
              </Link>
              <button
                onClick={() => onDelete(meal.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MealList;
