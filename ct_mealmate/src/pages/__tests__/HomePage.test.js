// src/pages/__tests__/HomePage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { MealsContext } from '../../context/MealsContext';

const sampleMeals = [
  { id: '1', name: 'Chicken Bowl', category: 'Lunch', day: 'Monday', favorite: true },
  { id: '2', name: 'Salmon Sushi', category: 'Dinner', day: 'Tuesday', favorite: false },
  { id: '3', name: 'Omelette', category: 'Breakfast', day: 'Monday', favorite: false },
];

const renderWithMeals = (ui, meals = sampleMeals, overrides = {}) => {
  const context = {
    meals,
    deleteMeal: jest.fn(),
    toggleFavorite: jest.fn(),
    ...overrides,
  };

  return render(
    <MealsContext.Provider value={context}>
      <MemoryRouter>{ui}</MemoryRouter>
    </MealsContext.Provider>
  );
};

describe('HomePage', () => {
  it('renders without crashing', () => {
    renderWithMeals(<HomePage />);
    expect(screen.getByText(/MealMate/i)).toBeInTheDocument();
  });

  it('displays meals grouped by day', () => {
    renderWithMeals(<HomePage />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Chicken Bowl')).toBeInTheDocument();
    expect(screen.getByText('Omelette')).toBeInTheDocument();
  });

  it('filters meals by search term', () => {
    renderWithMeals(<HomePage />);
    const input = screen.getByPlaceholderText(/search meals/i);
    fireEvent.change(input, { target: { value: 'salmon' } });

    expect(screen.getByText('Salmon Sushi')).toBeInTheDocument();
    expect(screen.queryByText('Chicken Bowl')).toBeNull();
  });

  it('filters meals by day', () => {
    renderWithMeals(<HomePage />);
    const select = screen.getByDisplayValue('Filter by Day');
    fireEvent.change(select, { target: { value: 'Monday' } });

    expect(screen.getByText('Omelette')).toBeInTheDocument();
    expect(screen.queryByText('Salmon Sushi')).toBeNull();
  });

  it('toggles favorite meals view', () => {
    renderWithMeals(<HomePage />);
    const button = screen.getByRole('button', { name: /favorites/i });
    fireEvent.click(button); // Show only favorites

    expect(screen.getByText('Chicken Bowl')).toBeInTheDocument();
    expect(screen.queryByText('Salmon Sushi')).toBeNull();
  });

  it('calls toggleFavorite when star is clicked', () => {
    const toggleFavorite = jest.fn();
    renderWithMeals(<HomePage />, sampleMeals, { toggleFavorite });

    const starButton = screen.getAllByTitle(/favorite/i)[0];
    fireEvent.click(starButton);

    expect(toggleFavorite).toHaveBeenCalledWith('1');
  });
});
