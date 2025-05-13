// EditMealPage.js
// Page for editing an existing meal using React Hook Form and Flatpickr

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import StickyHeader from '../components/StickyHeader';

function EditMealPage() {
  const navigate = useNavigate();
  const { mealId } = useParams(); // Get meal ID from URL params
  const { meals, editMeal } = useMeals(); // Access meal list and update method from context
  const meal = meals.find((m) => String(m.id) === String(mealId)); // Find the meal to edit

  // Set up React Hook Form with default values
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: meal || {
      name: '',
      category: '',
      favorite: false,
      date: new Date(),
    },
  });

  // Pre-fill form values once the meal is loaded
  React.useEffect(() => {
    if (meal) {
      setValue('name', meal.name);
      setValue('category', meal.category);
      setValue('favorite', meal.favorite);
      setValue('date', new Date(meal.date));
    }
  }, [meal, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    editMeal(mealId, {
      ...data,
      date: data.date.toISOString().split('T')[0], // Format date as yyyy-mm-dd
    });
    navigate('/'); // Redirect to homepage after saving
  };  

  // If meal not found
  if (!meal) return <p>Meal not found.</p>;

  return (
    <>
      <StickyHeader />
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>✏️ Edit Meal</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          {/* Name */}
          <div>
            <label>Meal Name</label>
            <br />
            <input
              {...register('name', { required: 'Meal name is required' })}
              style={inputStyle}
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>

          {/* Date */}
          <div>
            <label>Date</label>
            <br />
            <Flatpickr
              value={watch('date')}
              onChange={([date]) => setValue('date', date)}
              options={{ dateFormat: 'Y-m-d', defaultDate: new Date() }}
              className="flatpickr-input"
            />
          </div>

          {/* Category */}
          <div>
            <label>Meal Type</label>
            <br />
            {['Breakfast', 'Lunch', 'Dinner'].map((type) => (
              <label key={type} style={{ marginRight: '1rem' }}>
                <input
                  type="radio"
                  value={type}
                  {...register('category', { required: true })}
                />{' '}
                {type}
              </label>
            ))}
            {errors.category && <p style={errorStyle}>Meal type is required</p>}
          </div>

          {/* Favorite */}
          <div>
            <label>
              <input type="checkbox" {...register('favorite')} /> Favorite?
            </label>
          </div>

          {/* Submit */}
          <button type="submit" style={buttonStyle}>
            Save Changes
          </button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          <a href="/">← Back to Home</a>
        </div>
      </div>
    </>
  );
}

// Inline styles
const inputStyle = {
  padding: '0.5rem',
  width: '100%',
  marginTop: '0.25rem',
};

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  fontSize: '0.9rem',
};

export default EditMealPage;

// Summary:
// Purpose: Allows users to edit meal details including name, date, category, and favorite status.
// Tools used: react-hook-form for simple validation, Flatpickr for date input, and context for state management.
// Bonus: Auto-prefills existing values using React's useEffect and synchronizes changes smoothly.