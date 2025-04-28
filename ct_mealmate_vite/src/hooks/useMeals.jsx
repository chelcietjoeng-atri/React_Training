// useMeals.js
// Custom hook to manage meal state and basic CRUD operations

import React, { createContext, useContext, useState } from 'react';

const MealsContext = createContext();

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([
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

  const addMeal = (meal) => {
    const newMeal = { ...meal, id: Date.now() };
    setMeals((prev) => [...prev, newMeal]);
  };

  const updateMeal = (updatedMeal) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === updatedMeal.id ? updatedMeal : m))
    );
  };

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MealsContext.Provider value={{ meals, addMeal, updateMeal, deleteMeal }}>
      {children}
    </MealsContext.Provider>
  );
}

export default function useMeals() {
  const context = useContext(MealsContext);
  if (!context) throw new Error('useMeals must be used within MealsProvider');
  return context;
}
