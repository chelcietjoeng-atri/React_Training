import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddMealPage from '../AddMealPage';
import HomePage from '../HomePage'; // for redirect testing
import { MealsProvider } from '../../context/MealsContext';

const renderAddPage = () => {
  return render(
    <MealsProvider>
      <MemoryRouter initialEntries={['/add-meal']}>
        <Routes>
          <Route path="/add-meal" element={<AddMealPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    </MealsProvider>
  );
};

describe('AddMealPage', () => {
  it('renders form inputs', () => {
    renderAddPage();
    expect(screen.getByLabelText(/meal name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/day/i)).toBeInTheDocument();
  });

  it('adds a new meal and redirects to home', () => {
    renderAddPage();

    fireEvent.change(screen.getByLabelText(/meal name/i), {
      target: { value: 'Tacos' },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'Dinner' },
    });
    fireEvent.change(screen.getByLabelText(/day/i), {
      target: { value: 'Wednesday' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add meal/i }));

    // You can test for redirect by checking HomePage text shows up
    expect(screen.getByText(/MealMate/i)).toBeInTheDocument();
  });
});
