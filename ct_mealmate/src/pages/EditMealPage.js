// EditMealPage.js
// Page to edit an existing meal using React Hook Form
// Uses the meal ID from the URL to fetch and update data from context

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMeals } from '../context/MealsContext';

function EditMealPage() {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const { meals, editMeal } = useMeals(); // ⬅️ updated from updateMeal to editMeal
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mealToEdit = meals.find((meal) => String(meal.id) === mealId);

  useEffect(() => {
    if (mealToEdit) {
      reset(mealToEdit);
    }
  }, [mealToEdit, reset]);

  const onSubmit = (data) => {
    editMeal(mealId, data); // ⬅️ updated function call
    navigate('/');
  };

  if (!mealToEdit) return <p>Meal not found.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>✏️ Edit Meal</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Name */}
        <div>
          <label>Meal Name</label><br />
          <input {...register("name", { required: "Meal name is required" })} style={inputStyle} />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>

        {/* Day */}
        <div>
          <label>Day</label><br />
          <select {...register("day", { required: "Day is required" })} style={inputStyle}>
            <option value="">Select Day</option>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
              <option key={day}>{day}</option>
            ))}
          </select>
          {errors.day && <p style={errorStyle}>{errors.day.message}</p>}
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

        {/* Favorite */}
        <div>
          <label>
            <input type="checkbox" {...register("favorite")} /> Favorite?
          </label>
        </div>

        {/* Submit */}
        <button type="submit" style={buttonStyle}>Update Meal</button>
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
  marginTop: '0.25rem'
};

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const errorStyle = {
  color: 'red',
  fontSize: '0.9rem'
};

export default EditMealPage;
