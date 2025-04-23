// src/context/__tests__/MealsContext.test.js
import { renderHook, act } from '@testing-library/react';
import { MealsProvider, useMeals } from '../MealsContext';

const wrapper = ({ children }) => <MealsProvider>{children}</MealsProvider>;

describe('MealsContext', () => {
  it('adds a meal', () => {
    const { result } = renderHook(() => useMeals(), { wrapper });

    act(() => {
      result.current.addMeal({ name: 'Pasta', category: 'Dinner', day: 'Friday' });
    });

    expect(result.current.meals).toHaveLength(1);
    expect(result.current.meals[0].name).toBe('Pasta');
  });

  it('edits a meal', () => {
    const { result } = renderHook(() => useMeals(), { wrapper });

    act(() => {
      result.current.addMeal({ name: 'Rice', category: 'Lunch', day: 'Monday' });
    });

    const mealId = result.current.meals[0].id;

    act(() => {
      result.current.editMeal(mealId, { name: 'Fried Rice' });
    });

    expect(result.current.meals[0].name).toBe('Fried Rice');
  });

  it('deletes a meal', () => {
    const { result } = renderHook(() => useMeals(), { wrapper });

    act(() => {
      result.current.addMeal({ name: 'Burger', category: 'Dinner', day: 'Sunday' });
    });

    const mealId = result.current.meals[0].id;

    act(() => {
      result.current.deleteMeal(mealId);
    });

    expect(result.current.meals).toHaveLength(0);
  });

  it('toggles favorite', () => {
    const { result } = renderHook(() => useMeals(), { wrapper });

    act(() => {
      result.current.addMeal({ name: 'Soup', category: 'Lunch', day: 'Tuesday' });
    });

    const mealId = result.current.meals[0].id;

    act(() => {
      result.current.toggleFavorite(mealId);
    });

    expect(result.current.meals[0].favorite).toBe(true);
  });
});
