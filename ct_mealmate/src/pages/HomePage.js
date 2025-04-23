// HomePage.js
// Main page that lists all meals and links to add/edit forms

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';

// Utility to group meals by day
const groupByDay = (meals) => {
  return meals.reduce((acc, meal) => {
    acc[meal.day] = acc[meal.day] || [];
    acc[meal.day].push(meal);
    return acc;
  }, {});
};

// Get today's weekday name
const getToday = () => {
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ];
  return days[new Date().getDay()];
};

function HomePage() {
  const { meals, deleteMeal } = useMeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [sortField, setSortField] = useState('');

  const today = getToday();

  // Filter, search, and sort
  const filteredMeals = meals
    .filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((meal) => (filterDay ? meal.day === filterDay : true))
    .sort((a, b) => {
      if (sortField === 'day') return a.day.localeCompare(b.day);
      if (sortField === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  const groupedMeals = groupByDay(filteredMeals);

  return (
    <div className="container">
      <h1>🍽️ CT's MealMate - Weekly Meal Planner</h1>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/add-meal">➕ Add a New Meal</Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
          <option value="">Filter by day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="">Sort by…</option>
          <option value="day">Sort by Day</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {Object.keys(groupedMeals).map((day) => (
        <div key={day} style={{ marginBottom: '2rem' }}>
          <h2>{day}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Category</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedMeals[day].map((meal) => (
                <tr
                  key={meal.id}
                  style={{
                    backgroundColor: meal.day === today ? '#fff9c4' : 'transparent'
                  }}
                >
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{meal.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{meal.category}</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                    <Link to={`/edit-meal/${meal.id}`}>Edit</Link>{' '}
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

export default HomePage;
