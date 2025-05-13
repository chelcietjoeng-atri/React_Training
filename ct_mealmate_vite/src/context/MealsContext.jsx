// MealsContext.jsx
// Central context for managing all meal-related state and operations (CRUD) app-wide

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MealsContext = createContext();
const API_URL = 'http://localhost:3001/meals'; // JSON-server mock endpoint

// Provider wraps the app to share meals state with any component
export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]); // All meals in the app

  // On first mount, fetch meals from the backend
  useEffect(() => {
    fetchMeals();
  }, []);

  // GET all meals
  const fetchMeals = async () => {
    try {
      const res = await axios.get(API_URL);
      setMeals(res.data); // Store meals in state
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    }
  };

  // POST new meal
  const addMeal = async (meal) => {
    try {
      const response = await axios.post(API_URL, meal); 
      setMeals((prev) => [...prev, response.data]); // Add to local state
    } catch (error) {
      console.error('Failed to add meal:', error);
    }
  };  

  // DELETE a meal by ID
  const deleteMeal = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMeals((prev) => prev.filter((m) => m.id !== id)); // Remove from state
    } catch (error) {
      console.error('Failed to delete meal:', error);
    }
  };

  // PUT to update a meal
  const editMeal = async (id, updatedMeal) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedMeal);
      setMeals((prev) =>
        prev.map((meal) => (meal.id === id ? response.data : meal)) // Replace with updated meal
      );
    } catch (error) {
      console.error('Failed to edit meal:', error);
    }
  };

  // PATCH to toggle the 'favorite' status of a meal
  const toggleFavorite = async (id) => {
    try {
      const meal = meals.find((m) => m.id === id);
      if (!meal) return;
      const response = await axios.patch(`${API_URL}/${id}`, {
        favorite: !meal.favorite,
      });
      setMeals((prev) =>
        prev.map((m) => (m.id === id ? response.data : m)) // Update local state
      );
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  // Share these values/functions across app
  return (
    <MealsContext.Provider
      value={{ meals, addMeal, deleteMeal, editMeal, toggleFavorite }}
    >
      {children}
    </MealsContext.Provider>
  );
}

// Custom hook to access meals context easily
export function useMeals() {
  return useContext(MealsContext);
}

// Summary:
// What: This is the global meal state manager using React Context. It handles CRUD operations and keeps the UI in sync with the mock backend (via json-server).
// Why: Any component (like the meal list, add form, or edit view) can access or update meal data without prop-drilling.
// How:
// - Fetches meals on initial load.
// - Supports adding, editing, deleting, and toggling favorites.
// - Updates both local state and the backend (via axios).