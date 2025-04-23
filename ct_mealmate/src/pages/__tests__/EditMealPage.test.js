import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditMealPage from '../EditMealPage';
import HomePage from '../HomePage';
import { MealsProvider } from '../../context/MealsContext';

// Create a test meal and persist it in localStorage
const testMeal = {
  id: 'test-id',
  name: 'Pizza',
  category: 'Dinner',
  day: 'Friday',
  favorite: false,
};

beforeEach(() => {
  localStorage.setItem('meals', JSON.stringify([testMeal]));
});

afterEach(() => {
  localStorage.clear();
});

const renderEditPage = () => {
  return render(
    <MealsProvider>
      <MemoryRouter initialEntries={['/edit-meal/test-id']}>
        <Routes>
          <Route path="/edit-meal/:mealId" element={<EditMealPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    </MealsProvider>
  );
};

describe('EditMealPage', () => {
  it('renders form with existing meal data', () => {
    renderEditPage();
    expect(screen.getByDisplayValue('Pizza')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dinner')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Friday')).toBeInTheDocument();
  });

  it('updates a meal and returns home', () => {
    renderEditPage();
    fireEvent.change(screen.getByLabelText(/meal name/i), {
      target: { value: 'Pizza Supreme' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(screen.getByText(/MealMate/i)).toBeInTheDocument();
  });
});
