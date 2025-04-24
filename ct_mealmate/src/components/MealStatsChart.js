import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a6c']

const MealStatsChart = ({ meals, filterWeekDates = [], showFavoritesOnly = false }) => {
  const [chartType, setChartType] = useState('bar');

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const inWeek = filterWeekDates.length === 0 || filterWeekDates.includes(meal.date);
      const isFav = !showFavoritesOnly || meal.favorite;
      return inWeek && isFav;
    });
  }, [meals, filterWeekDates, showFavoritesOnly]);

  const countByCategory = filteredMeals.reduce((acc, meal) => {
    acc[meal.category] = (acc[meal.category] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(countByCategory).map(([category, count]) => ({
    category,
    count
  }));

  return (
    <div
      style={{
        background: '#f9f9f9',
        padding: '1rem',
        borderRadius: '0.75rem',
        marginBottom: '2rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>🍴 Meals by Category</h2>
        <button
          onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
          style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', border: '1px solid #ccc', background: 'white' }}
        >
          Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
        </button>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        {chartType === 'bar' ? (
          <BarChart data={data} barCategoryGap={40}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} isAnimationActive />
          </BarChart>
        ) : (
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
              isAnimationActive
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default MealStatsChart;
