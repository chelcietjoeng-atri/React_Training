// AddMealPage.js
// Add meal form using React Hook Form with validation and basic logging

// AddMealPage.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';

function AddMealPage() {
  const { addMeal } = useMeals();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    addMeal(data);
    reset();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>➕ Add a New Meal</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Name */}
        <div>
          <label>Meal Name</label><br />
          <input type="text" {...register("name", { required: "Meal name is required" })} style={inputStyle} />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label>Meal Type</label><br />
          {["Breakfast", "Lunch", "Dinner"].map(type => (
            <label key={type} style={{ marginRight: '1rem' }}>
              <input type="radio" value={type} {...register("category", { required: true })} /> {type}
            </label>
          ))}
          {errors.category && <p style={errorStyle}>Meal type is required</p>}
        </div>

        {/* Day */}
        <div>
          <label>Day</label><br />
          <select {...register("day", { required: true })} style={inputStyle}>
            <option value="">--Select a Day--</option>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
              <option key={day}>{day}</option>
            ))}
          </select>
          {errors.day && <p style={errorStyle}>Day is required</p>}
        </div>

        {/* Favorite */}
        <div>
          <label>
            <input type="checkbox" {...register("favorite")} /> Favorite?
          </label>
        </div>

        {/* Submit */}
        <button type="submit" style={buttonStyle}>Add Meal</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  width: '100%',
  maxWidth: '100%',
  marginTop: '0.25rem'
};

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const errorStyle = {
  color: 'red',
  fontSize: '0.9rem'
};

export default AddMealPage;
