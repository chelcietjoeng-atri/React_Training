import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MealsContext = createContext();
const API_URL = 'http://localhost:3001/meals';

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]);

  // Fetch meals on load
  useEffect(() => {
    axios.get(API_URL).then((res) => setMeals(res.data)).catch(console.error);
  }, []);

  const addMeal = async (meal) => {
    const response = await axios.post(API_URL, meal); 
    setMeals((prev) => [...prev, response.data]);
  };  

  const deleteMeal = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const editMeal = async (id, updatedMeal) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedMeal);
    setMeals((prev) =>
      prev.map((meal) => (meal.id === id ? response.data : meal))
    );
  };

  const toggleFavorite = async (id) => {
    const meal = meals.find((m) => m.id === id);
    if (!meal) return;
    const response = await axios.patch(`${API_URL}/${id}`, {
      favorite: !meal.favorite,
    });
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? response.data : m))
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