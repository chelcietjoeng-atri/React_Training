import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';

function WeekNavigator({ currentDate, onChange }) {
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));

  const handlePrevWeek = () => {
    const prev = subWeeks(weekStart, 1);
    setWeekStart(prev);
    onChange(prev);
  };

  const handleNextWeek = () => {
    const next = addWeeks(weekStart, 1);
    setWeekStart(next);
    onChange(next);
  };

  useEffect(() => {
    onChange(weekStart);
  }, [weekStart]);

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
