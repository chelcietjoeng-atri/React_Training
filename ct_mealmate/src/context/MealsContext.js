import React, { createContext, useContext, useState } from 'react';

const MealsContext = createContext();

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([
    {
      id: 1,
      name: "Grilled Chicken Bowl",
      type: "Lunch",
      day: "Monday",
      favorite: true,
    },
    {
      id: 2,
      name: "Avocado Toast",
      type: "Breakfast",
      day: "Tuesday",
      favorite: false,
    },
  ]);

  const addMeal = (meal) => {
    const newMeal = { ...meal, id: Date.now() };
    setMeals((prev) => [...prev, newMeal]);
  };

  const editMeal = (id, updatedMeal) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...updatedMeal, id } : m))
    );
  };

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const getMealById = (id) => meals.find((m) => m.id === Number(id));

  return (
    <MealsContext.Provider value={{ meals, addMeal, editMeal, deleteMeal, getMealById }}>
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  return useContext(MealsContext);
}
