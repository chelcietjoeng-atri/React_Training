// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';
import { startOfWeek, addDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react'; 

// Group meals by date (YYYY-MM-DD)
const groupByDate = (meals) =>
  meals.reduce((acc, meal) => {
    acc[meal.date] = acc[meal.date] || [];
    acc[meal.date].push(meal);
    return acc;
  }, {});

function HomePage() {
  const { meals, deleteMeal, toggleFavorite } = useMeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const [lastActionTime, setLastActionTime] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const prevMealMapRef = useRef(new Map());
  const prevMealIdsRef = useRef(new Set());

  useEffect(() => {
    const currentMap = new Map(meals.map((meal) => [meal.id, meal.favorite]));
    const currentIds = new Set(meals.map((meal) => meal.id));
    const prevMap = prevMealMapRef.current;
    const prevIds = prevMealIdsRef.current;

    const newMeal = meals.find((meal) => !prevIds.has(meal.id));
    const toggledMeal = meals.find(
      (meal) => prevMap.has(meal.id) && prevMap.get(meal.id) !== meal.favorite
    );

    const highlighted = newMeal || toggledMeal;
    if (highlighted) {
      setHighlightedId(highlighted.id);
      setLastActionTime(Date.now());
      const timeout = setTimeout(() => setHighlightedId(null), 1500);
      prevMealMapRef.current = currentMap;
      prevMealIdsRef.current = currentIds;
      return () => clearTimeout(timeout);
    }

    prevMealMapRef.current = currentMap;
    prevMealIdsRef.current = currentIds;
  }, [meals]);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeekStart, i);
    return format(date, 'yyyy-MM-dd');
  });

  const filteredMeals = meals
    .filter((meal) => weekDates.includes(meal.date))
    .filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((meal) => (showFavoritesOnly ? meal.favorite : true))
    .sort((a, b) => {
      if (sortField === 'date') return a.date.localeCompare(b.date);
      if (sortField === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const groupedMeals = groupByDate(filteredMeals);

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🍽️ CT's MealMate</h1>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/add-meal" style={{ fontSize: '1rem' }}>➕ Add a New Meal</Link>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search meals"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.4rem', flexGrow: 1 }}
        />

        <select value={sortField} onChange={(e) => setSortField(e.target.value)} style={{ padding: '0.4rem' }}>
          <option value="">Sort by…</option>
          <option value="date">Date</option>
          <option value="category">Category</option>
        </select>

        <button onClick={() => setShowFavoritesOnly((prev) => !prev)} style={{ padding: '0.4rem' }}>
          {showFavoritesOnly ? 'Show All Meals' : '⭐ Show Favorites'}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}>← Prev Week</button>
        
        <strong>
          Week of {format(currentWeekStart, 'EEEE, MMM d')} – {format(addDays(currentWeekStart, 6), 'EEEE, MMM d')}
        </strong>
        
        <button onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}>Next Week →</button>

        <button
          onClick={() => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
          style={{ marginLeft: 'auto' }}
        >
          Today
        </button>

        <DatePicker
          selected={currentWeekStart}
          onChange={(date) => setCurrentWeekStart(startOfWeek(date, { weekStartsOn: 1 }))}
          customInput={
            <button title="Pick a week" style={{ padding: '0.3rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={16} />
              Pick Date
            </button>
          }
          popperPlacement="bottom-end"
        />
      </div>

      {weekDates.map((dateStr) => (
        <div key={dateStr} style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>{format(new Date(dateStr), 'EEEE, MMM d')}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr>
                <th style={thStyle}>Meal</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>⭐</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(groupedMeals[dateStr] || []).map((meal) => {
                const isHighlighted = highlightedId === meal.id && Date.now() - lastActionTime < 2000;
                const backgroundColor = isHighlighted
                  ? meal.favorite ? '#fff3c0' : '#d4f4f7'
                  : 'white';

                return (
                  <tr
                    key={meal.id}
                    style={{
                      backgroundColor,
                      transition: 'background-color 0.6s ease'
                    }}
                  >
                    <td style={tdStyle}>{meal.name}</td>
                    <td style={tdStyle}>{meal.category}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button
                        onClick={() => toggleFavorite(meal.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2rem'
                        }}
                        title={meal.favorite ? 'Unmark Favorite' : 'Mark Favorite'}
                      >
                        {meal.favorite ? '⭐' : '☆'}
                      </button>
                    </td>
                    <td style={tdStyle}>
                      <Link to={`/edit-meal/${meal.id}`} style={{ marginRight: '0.5rem' }}>Edit</Link>
                      <button onClick={() => deleteMeal(meal.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

const thStyle = {
  padding: '0.6rem',
  border: '1px solid #ddd',
  textAlign: 'left'
};

const tdStyle = {
  padding: '0.6rem',
  border: '1px solid #ddd'
};

export default HomePage;
