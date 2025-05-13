// useMeals.js
// Custom hook and context provider to manage local meal state with CRUD actions

import React, { createContext, useContext, useState } from 'react';

// Create the context object for sharing state
const MealsContext = createContext();

// MealsProvider wraps components to share the meal state and actions
export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([
    // Initial hardcoded meals for demo/testing
    {
      id: 1,
      name: "Grilled Chicken Bowl",
      category: "Lunch",
      day: "Monday",
      favorite: true,
    },
    {
      id: 2,
      name: "Avocado Toast",
      category: "Breakfast",
      day: "Tuesday",
      favorite: false,
    },
  ]);

  // Add new meal with unique ID
  const addMeal = (meal) => {
    const newMeal = { ...meal, id: Date.now() }; // Quick ID generation
    setMeals((prev) => [...prev, newMeal]);
  };

  // Update existing meal by ID
  const updateMeal = (updatedMeal) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === updatedMeal.id ? updatedMeal : m))
    );
  };

  // Delete meal by ID
  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  // Provide values to children
  return (
    <MealsContext.Provider value={{ meals, addMeal, updateMeal, deleteMeal }}>
      {children}
    </MealsContext.Provider>
  );
}

// Custom hook for consuming meal context
export default function useMeals() {
  const context = useContext(MealsContext);
  if (!context) throw new Error('useMeals must be used within MealsProvider');
  return context;
}

// Summary:
// What: This is a lightweight version of the MealsContext, using hardcoded data and useState instead of external API calls. It's useful for quick testing or isolated environments like Storybook or early prototyping.
// Why: This version is great when you don't want to rely on a backend. It simplifies the logic and helps test the UI and context flows independently.
// How:
// - Two sample meals are initialized.
// - You can add, update, or delete meals, and the state updates accordingly.
// - A custom hook (useMeals) provides access to these functions and the meals array.