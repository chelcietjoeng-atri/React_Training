// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';

// Group meals by day
const groupByDay = (meals) =>
  meals.reduce((acc, meal) => {
    acc[meal.day] = acc[meal.day] || [];
    acc[meal.day].push(meal);
    return acc;
  }, {});

// Get today’s weekday
const getToday = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

function HomePage() {
  const { meals, deleteMeal, toggleFavorite } = useMeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [sortField, setSortField] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const today = getToday();

  const filteredMeals = meals
    .filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((meal) => (filterDay ? meal.day === filterDay : true))
    .filter((meal) => (showFavoritesOnly ? meal.favorite : true))
    .sort((a, b) => {
      if (sortField === 'day') return a.day.localeCompare(b.day);
      if (sortField === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const groupedMeals = groupByDay(filteredMeals);

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

        <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)} style={{ padding: '0.4rem' }}>
          <option value="">Filter by Day</option>
          {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
            <option key={day}>{day}</option>
          ))}
        </select>

        <select value={sortField} onChange={(e) => setSortField(e.target.value)} style={{ padding: '0.4rem' }}>
          <option value="">Sort by…</option>
          <option value="day">Day</option>
          <option value="category">Category</option>
        </select>

        <button onClick={() => setShowFavoritesOnly((prev) => !prev)} style={{ padding: '0.4rem' }}>
          {showFavoritesOnly ? 'Show All Meals' : '⭐ Show Favorites'}
        </button>
      </div>

      {Object.keys(groupedMeals).map((day) => (
        <div key={day} style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>{day}</h2>
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
              {groupedMeals[day].map((meal) => (
                <tr
                  key={meal.id}
                  style={{
                    backgroundColor: meal.day === today ? '#fffde7' : meal.favorite ? '#fff8e1' : 'white'
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
              ))}
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
