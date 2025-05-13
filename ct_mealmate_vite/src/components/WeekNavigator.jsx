// WeekNavigator.jsx
// This component allows users to navigate through different weeks.
// It displays the current week's date range and lets users go to the previous or next week.

import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns'; // Utility functions for date manipulation

function WeekNavigator({ currentDate, onChange }) {
  // Initialize the start of the week (Monday as start)
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));

  // Go to the previous week
  const handlePrevWeek = () => {
    const prev = subWeeks(weekStart, 1); // Subtract one week from current start
    setWeekStart(prev); // Update local state
    onChange(prev);  // Notify parent component
  };

  // Go to the next week
  const handleNextWeek = () => {
    const next = addWeeks(weekStart, 1); // Add one week
    setWeekStart(next); // Update local state
    onChange(next); // Notify parent component
  };

  // Ensure parent is notified on initial mount or when weekStart changes
  useEffect(() => {
    onChange(weekStart);
  }, [weekStart]);

  // Compute end of the current week (Sunday as end)
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <button onClick={handlePrevWeek}>⬅️</button>
      <span style={{ fontWeight: 'bold' }}>
        {format(weekStart, 'MMM d')} – {format(weekEnd, 'MMM d, yyyy')}
      </span>
      <button onClick={handleNextWeek}>➡️</button>
    </div>
  );
}

export default WeekNavigator;

// Summary:
// What: Displays and controls the visible week range.
// Why use date-fns: Simplifies date calculations like "start of week", "add weeks", etc.
// Why useState: Keeps track of the selected week's start date.
// Why onChange: Lets the parent component (e.g., planner or chart) respond to week changes.
// Why useEffect: Ensures onChange is called even on initial load or prop update.