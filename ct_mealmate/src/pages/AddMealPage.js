// AddMealPage.js
// Page to add a new meal using React Hook Form

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { useLocation } from 'react-router-dom';
import { parseISO, isValid } from 'date-fns';
import { format } from 'date-fns';
import StickyHeader from '../components/StickyHeader'; 


function AddMealPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dateParam = params.get('date');
  const defaultDate = dateParam && isValid(parseISO(dateParam)) ? dateParam : format(new Date(), 'yyyy-MM-dd');

  const navigate = useNavigate();
  const { addMeal } = useMeals();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      date: defaultDate,
    }
  });  

  const onSubmit = (data) => {
    addMeal({ ...data, date: data.date.toISOString().split('T')[0] });
    navigate('/');
  };

  return (
    <>
      <StickyHeader />
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🍽️ Add New Meal</h1>

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
            Add Meal
          </button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          <a href="/">← Back to Home</a>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  padding: '0.5rem',
  width: '100%',
  marginTop: '0.25rem',
};

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  fontSize: '0.9rem',
};

export default AddMealPage;
