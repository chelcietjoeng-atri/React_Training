// EditMealPage.js
// Page to edit an existing meal using React Hook Form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

function EditMealPage() {
  const navigate = useNavigate();
  const { mealId } = useParams();
  const { meals, editMeal } = useMeals(); 
  const meal = meals.find((m) => m.id === mealId); 

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

  React.useEffect(() => {
    if (meal) {
      setValue('name', meal.name);
      setValue('category', meal.category);
      setValue('favorite', meal.favorite);
      setValue('date', new Date(meal.date));
    }
  }, [meal, setValue]);

  const onSubmit = (data) => {
    editMeal(mealId, {
      ...data,
      date: data.date.toISOString().split('T')[0],
    });
    navigate('/');
  };  

  if (!meal) return <p>Meal not found.</p>;

  return (
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
  );
}

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
