// HomePage.js
// Main page that lists all meals for the selected week, with filtering, sorting, and favorite toggling

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMeals } from '../context/MealsContext'; // Access meal data and actions (add/edit/delete)
import { startOfWeek, addDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react'; // Icon for date picker
import MealStatsModal from '../components/MealStatsModal'; // Modal to show summary statistics
import { useNavigate } from 'react-router-dom';
import StickyHeader from '../components/StickyHeader'; // Header that stays visible while scrolling

// Group meals by date (YYYY-MM-DD format) for grouped rendering
const groupByDate = (meals) =>
  meals.reduce((acc, meal) => {
    acc[meal.date] = acc[meal.date] || [];
    acc[meal.date].push(meal);
    return acc;
  }, {});

function HomePage() {
  // Context methods
  const { meals, deleteMeal, toggleFavorite } = useMeals();

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null); // Highlights recently added/toggled meals
  const [lastActionTime, setLastActionTime] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false); // Controls stats modal visibility

  // Previous meal state refs to detect changes
  const prevMealMapRef = useRef(new Map());
  const prevMealIdsRef = useRef(new Set());

  // Watch for new meals or favorite toggles to trigger a highlight effect
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

  // Generate list of all days in current week for filtering and display
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeekStart, i);
    return format(date, 'yyyy-MM-dd');
  });

  // Filter meals based on selected week, search term, and favorites toggle
  const filteredMeals = meals
  .filter((meal) => {
    const mealDate = format(new Date(meal.date), 'yyyy-MM-dd');

    // Week filter (always apply)
    const inCurrentWeek = weekDates.includes(mealDate);

    // Search filter
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Favorites filter
    const matchesFavorite = !showFavoritesOnly || meal.favorite;

    return inCurrentWeek && matchesSearch && matchesFavorite;
  })
  .sort((a, b) => {
    if (sortField === 'date') return a.date.localeCompare(b.date);
    if (sortField === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  // Group filtered meals by date for the weekly view
  const groupedMeals = groupByDate(filteredMeals);

  return (
    <>
      <StickyHeader />
      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            placeholder="Search meals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem',
              flexGrow: 1,
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
              minWidth: '200px',
            }}
          />

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.4rem' }}
          >
            <option value="">Sort by…</option>
            <option value="date">Date</option>
            <option value="category">Category</option>
          </select>

          <button
            onClick={() => setShowFavoritesOnly((prev) => !prev)}
            style={{
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
            }}
          >
            {showFavoritesOnly ? 'Show All Meals' : '⭐ Show Favorites'}
          </button>

          <button
            onClick={() => navigate('/add-meal')}
            style={{
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
            }}
          >
            ➕ Add a New Meal
          </button>

          <button onClick={() => setShowStats(true)}
            style={{
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
            }}
          >
            📊 View Meal Stats
          </button>

          <MealStatsModal
            meals={meals}
            isOpen={showStats}
            onClose={() => setShowStats(false)}
            filterWeek={true}
            filterFavorites={showFavoritesOnly}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          <button
            onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
            style={{
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            ← Prev Week
          </button>

          <strong style={{ fontSize: '1rem' }}>
            Week of {format(currentWeekStart, 'EEEE, MMM d')} – {format(addDays(currentWeekStart, 6), 'EEEE, MMM d')}
          </strong>

          <button
            onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
            style={{
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            Next Week →
          </button>

          <button
            onClick={() => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
            style={{
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            Today
          </button>

          <DatePicker
            selected={currentWeekStart}
            onChange={(date) => setCurrentWeekStart(startOfWeek(date, { weekStartsOn: 1 }))}
            customInput={
              <button
                title="Pick a week"
                style={{
                  padding: '0.4rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.4rem',
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer',
                }}
              >
                <Calendar size={16} />
                Pick Date
              </button>
            }
            popperPlacement="bottom-end"
          />
        </div>

        {searchTerm ? (
          <>
            <h2 style={{ marginBottom: '1rem' }}>
              Search Results for "<em>{searchTerm}</em>"
            </h2>
            {filteredMeals.length === 0 ? (
              <div style={{ textAlign: 'center', margin: '2rem 0', color: '#666' }}>
                <p>No meals match your search for this week.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead style={{ backgroundColor: '#f8f8f8' }}>
                  <tr>
                    <th style={thStyle}>Meal</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>⭐</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeals.map((meal) => {
                    const isHighlighted = highlightedId === meal.id && Date.now() - lastActionTime < 2000;
                    const backgroundColor = isHighlighted
                      ? meal.favorite ? '#fff3c0' : '#d4f4f7'
                      : 'white';

                    return (
                      <tr key={meal.id} style={{ backgroundColor, transition: 'background-color 0.6s ease' }}>
                        <td style={tdStyle}>{meal.name}</td>
                        <td style={tdStyle}>{meal.category}</td>
                        <td style={tdStyle}>{format(new Date(meal.date), 'yyyy-MM-dd')}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          <button
                            onClick={() => toggleFavorite(meal.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '1.3rem'
                            }}
                            title={meal.favorite ? 'Unmark Favorite' : 'Mark Favorite'}
                          >
                            {meal.favorite ? '⭐' : '☆'}
                          </button>
                        </td>
                        <td style={tdStyle}>
                          <button
                            onClick={() => navigate(`/edit-meal/${meal.id}`)}
                            style={{
                              padding: '0.4rem 0.75rem',
                              marginRight: '0.5rem',
                              border: '1px solid #ccc',
                              borderRadius: '0.4rem',
                              backgroundColor: '#f9f9f9',
                              cursor: 'pointer'
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteMeal(meal.id)}
                            style={{
                              padding: '0.4rem 0.75rem',
                              border: '1px solid #ccc',
                              borderRadius: '0.4rem',
                              backgroundColor: '#f9f9f9',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        ) : (
          // grouped view if not searching
          <>
            {showFavoritesOnly && filteredMeals.length === 0 && (
              <div style={{ textAlign: 'center', margin: '2rem 0', color: '#666' }}>
                <p>No favorite meals found for this week.</p>
              </div>
            )}
            {weekDates
              .filter((dateStr) =>
                !showFavoritesOnly || (groupedMeals[dateStr] && groupedMeals[dateStr].some((meal) => meal.favorite))
              )
              .map((dateStr) => (
                <div key={dateStr} style={{ marginBottom: '2rem' }}>
                  <h2 style={{ marginBottom: '0.5rem' }}>{format(new Date(dateStr), 'EEEE, MMM d')}</h2>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead style={{ backgroundColor: '#f8f8f8' }}>
                      <tr>
                        <th style={thStyle}>Meal</th>
                        <th style={thStyle}>Category</th>
                        <th style={thStyle}>⭐</th>
                        <th style={thStyle}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(groupedMeals[dateStr] || []).length === 0 ? (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                            <Link
                              to={`/add-meal?date=${dateStr}`}
                              style={{
                                display: 'inline-block',
                                padding: '0.6rem 1.2rem',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '0.5rem',
                                border: '1px dashed #bbb',
                                color: '#444',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                fontStyle: 'italic',
                                transition: 'all 0.2s ease-in-out'
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e4e4e4')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                            >
                              ➕ Add a meal
                            </Link>
                          </td>
                        </tr>
                      ) : (
                        (groupedMeals[dateStr] || []).map((meal) => {
                          const isHighlighted = highlightedId === meal.id && Date.now() - lastActionTime < 2000;
                          const backgroundColor = isHighlighted
                            ? meal.favorite ? '#fff3c0' : '#d4f4f7'
                            : 'white';

                          return (
                            <tr
                              key={meal.id}
                              style={{ backgroundColor, transition: 'background-color 0.6s ease' }}
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
                                    fontSize: '1.3rem'
                                  }}
                                  title={meal.favorite ? 'Unmark Favorite' : 'Mark Favorite'}
                                >
                                  {meal.favorite ? '⭐' : '☆'}
                                </button>
                              </td>
                              <td style={tdStyle}>
                                <button
                                  onClick={() => navigate(`/edit-meal/${meal.id}`)}
                                  style={{
                                    padding: '0.4rem 0.75rem',
                                    marginRight: '0.5rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '0.4rem',
                                    backgroundColor: '#f9f9f9',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteMeal(meal.id)}
                                  style={{
                                    padding: '0.4rem 0.75rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '0.4rem',
                                    backgroundColor: '#f9f9f9',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}

// Styles
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

// Summary:
// What: Displays meals for the selected week with filtering, sorting, favorites, and inline actions (edit/delete). It highlights new or updated meals and supports week navigation.
// Why: To help users efficiently view, manage, and interact with their weekly meal plan, improving organization and engagement.
// How:
// - Filters meals by week, search, and favorites.
// - Sorts by date or category.
// - Highlights meals on add/favorite toggle using useEffect.
// - Groups meals by date for display.
// - Uses StickyHeader, MealStatsModal, and DatePicker for enhanced UI/UX.