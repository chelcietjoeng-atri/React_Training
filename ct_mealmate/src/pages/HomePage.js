// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React from 'react';
import { Link } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';
import MealList from '../components/MealList';


function HomePage() {
  const { meals, deleteMeal } = useMeals();
  <MealList meals={meals} onDelete={deleteMeal} />

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🍽️ CT's MealMate - Weekly Meal Planner</h1>

      <Link to="/add-meal" className="text-green-600 hover:underline">
        ➕ Add a New Meal
      </Link>

      {meals.length > 0 ? (
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
                  <Link
                    to={`/edit-meal/${meal.id}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMeal(meal.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-600">No meals planned yet. Start by adding one!</p>
      )}
    </div>
  );
}

export default HomePage;
