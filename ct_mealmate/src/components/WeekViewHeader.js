// WeekViewHeader.js
// Header with current week range and navigation buttons

import React from 'react';
import { format, startOfWeek, addWeeks, subWeeks, endOfWeek } from 'date-fns';

function WeekViewHeader({ currentWeekStart, setCurrentWeekStart }) {
  const prevWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  const nextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));

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
