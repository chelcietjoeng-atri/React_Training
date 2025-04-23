import React, { createContext, useContext, useState } from 'react';

const MealsContext = createContext();

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([
    { id: 1, name: "Grilled Chicken Bowl", category: "Lunch", day: "Monday", favorite: true },
    { id: 2, name: "Avocado Toast", category: "Breakfast", day: "Tuesday", favorite: false }
  ]);

  const addMeal = (meal) => {
    const newMeal = { ...meal, id: Date.now() };
    setMeals((prev) => [...prev, newMeal]);
  };

  const updateMeal = (updatedMeal) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === updatedMeal.id ? updatedMeal : meal
      )
    );
  };  

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  const toggleFavorite = (id) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === id ? { ...meal, favorite: !meal.favorite } : meal
      )
    );
  };

  return (
    <MealsContext.Provider value={{ meals, addMeal, updateMeal, deleteMeal, toggleFavorite,}}>
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealsContext);
  if (!context) throw new Error("useMeals must be used within MealsProvider");
  return context;
}
