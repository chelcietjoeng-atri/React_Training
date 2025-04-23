import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MealsContext = createContext();

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState(() => {
    try {
      const stored = localStorage.getItem('meals');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Load meals from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem('meals');
    if (stored) {
      try {
        setMeals(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse meals from localStorage:', e);
      }
    }
  }, []);

  // Save meals to localStorage on every update
  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const addMeal = (meal) => {
    const newMeal = { id: uuidv4(), favorite: false, ...meal };
    setMeals((prev) => [...prev, newMeal]);
  };

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const editMeal = (id, updatedMeal) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === id ? { ...meal, ...updatedMeal } : meal
      )
    );
  };

  const toggleFavorite = (id) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === id ? { ...meal, favorite: !meal.favorite } : meal
      )
    );
  };

  return (
    <MealsContext.Provider
      value={{ meals, addMeal, deleteMeal, editMeal, toggleFavorite }}
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  return useContext(MealsContext);
}
