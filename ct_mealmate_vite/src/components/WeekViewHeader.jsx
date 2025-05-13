// WeekViewHeader.js
// This component displays a header with the current week's date range and navigation buttons to move between weeks.

import React from 'react';
import { format, startOfWeek, addWeeks, subWeeks, endOfWeek } from 'date-fns'; // Utility functions for date manipulation

function WeekViewHeader({ currentWeekStart, setCurrentWeekStart }) {
  // Navigate to the previous week by subtracting 1 week
  const prevWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  // Navigate to the next week by adding 1 week
  const nextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));

  // Format and display the current week's date range
  const weekRange = `${format(currentWeekStart, 'MMM d')} - ${format(
    endOfWeek(currentWeekStart),
    'MMM d, yyyy'
  )}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <button onClick={prevWeek}>&larr; Previous</button>
      <h2>📅 {weekRange}</h2>
      <button onClick={nextWeek}>Next &rarr;</button>
    </div>
  );
}

export default WeekViewHeader;

// Summary:
// What: A simple reusable UI header to control which week the user is viewing in the app.
// Why: Keeps the user aware of what date range they’re interacting with, and allows them to navigate weeks in the planner or chart views.
// Why date-fns: To easily compute start/end of weeks and format dates without manual math.
// Why lift currentWeekStart to the parent: This allows other components (like the meal list or charts) to stay in sync with the selected week.