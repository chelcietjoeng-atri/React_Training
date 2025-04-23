// EditMealPage.js
// Page to edit an existing meal using React Hook Form
// Uses the meal ID from the URL to fetch and update data from context

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMeals } from '../context/MealsContext';  // Make sure this is the correct path

function EditMealPage() {
  const { mealId } = useParams(); // Grab ID from URL
  const navigate = useNavigate();
  const { meals, updateMeal } = useMeals();
  const { register, handleSubmit, reset } = useForm();

  // Find meal from context
  const mealToEdit = meals.find((meal) => String(meal.id) === mealId);

  useEffect(() => {
    if (mealToEdit) {
      reset(mealToEdit); // This will make sure the default values, including `category`, are set
    }
  }, [mealToEdit, reset]);
  
  const onSubmit = (data) => {
    updateMeal({ ...data, id: Number(mealId) });  // Ensure `data` includes all the updated fields, including `category`
    navigate('/'); // Go back home
  };  

  if (!mealToEdit) return <p>Meal not found.</p>;

  return (
    <div className="container">
      <h2>Edit Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Meal Name:</label>
          <input {...register('name', { required: true })} />
        </div>

        <div>
          <label>Day:</label>
          <select {...register('day', { required: true })}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <div>
          <label>Category:</label>
          <select {...register('type', { required: true })}>
            <option value="">Select Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <button type="submit">Update Meal</button>
      </form>
    </div>
  );
}

export default EditMealPage;
