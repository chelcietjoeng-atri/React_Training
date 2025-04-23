// AddMealPage.js
// Add meal form using React Hook Form with validation and basic logging

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useMeals } from '../context/MealsContext';


function AddMealPage() {
  const { addMeal } = useMeals(); // ← use real hook

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("✅ Meal submitted:", data);
    addMeal(data);
    reset();
    navigate("/");
  };  

  return (
    <div>
      <h1>➕ Add a New Meal</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "500px", margin: "1rem auto" }}>
        {/* Meal Name */}
        <div>
          <label>Meal Name</label><br />
          <input
            type="text"
            {...register("name", { required: "Meal name is required" })}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        {/* Meal Type */}
        <div style={{ marginTop: "1rem" }}>
          <label>Meal Type</label><br />
          <label><input type="radio" value="Breakfast" {...register("category", { required: true })} /> Breakfast</label><br />
          <label><input type="radio" value="Lunch" {...register("category", { required: true })} /> Lunch</label><br />
          <label><input type="radio" value="Dinner" {...register("category", { required: true })} /> Dinner</label>
          {errors.category && <p style={{ color: "red" }}>Meal type is required</p>}
        </div>

        {/* Day of Week */}
        <div style={{ marginTop: "1rem" }}>
          <label>Day</label><br />
          <select {...register("day", { required: true })}>
            <option value="">--Select a Day--</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
          {errors.day && <p style={{ color: "red" }}>Day is required</p>}
        </div>

        {/* Favorite */}
        <div style={{ marginTop: "1rem" }}>
          <label>
            <input type="checkbox" {...register("favorite")} /> Favorite?
          </label>
        </div>

        {/* Submit */}
        <div style={{ marginTop: "1.5rem" }}>
          <button type="submit">Add Meal</button>
        </div>
      </form>

      {/* Back Link */}
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default AddMealPage;
