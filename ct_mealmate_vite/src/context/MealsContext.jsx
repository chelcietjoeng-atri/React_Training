// src/context/MealsContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MealsContext = createContext();
const API_URL = 'http://localhost:3001/meals';

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]);

  // Fetch meals on load
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get(API_URL);
      setMeals(res.data);
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    }
  };

  const addMeal = async (meal) => {
    try {
      const response = await axios.post(API_URL, meal); 
      setMeals((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to add meal:', error);
    }
  };  

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMeals((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Failed to delete meal:', error);
    }
  };

  const editMeal = async (id, updatedMeal) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedMeal);
      setMeals((prev) =>
        prev.map((meal) => (meal.id === id ? response.data : meal))
      );
    } catch (error) {
      console.error('Failed to edit meal:', error);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const meal = meals.find((m) => m.id === id);
      if (!meal) return;
      const response = await axios.patch(`${API_URL}/${id}`, {
        favorite: !meal.favorite,
      });
      setMeals((prev) =>
        prev.map((m) => (m.id === id ? response.data : m))
      );
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
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
