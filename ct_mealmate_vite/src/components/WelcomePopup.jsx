// WelcomePopup.js
// Displays a popup on initial load with a friendly greeting and quick action options for the user.

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePopup.css'; // Contains styles like fade-in animation and layout

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false); // Controls whether the popup is shown
  const navigate = useNavigate(); // React Router hook to programmatically navigate

  // Show popup immediately on component mount
  useEffect(() => {
    setVisible(true);
  }, []);

  // Determine time-based greeting (morning, afternoon, evening)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  // Navigate to add-meal page and hide the popup
  const handleAdd = () => {
    setVisible(false);
    navigate('/add-meal');
  };

  // Navigate to view meals (homepage) and hide the popup
  const handleView = () => {
    setVisible(false);
    navigate('/');
  };

  // Don’t render anything if popup isn’t visible
  if (!visible) return null;

  return (
    <div className="welcome-popup fade-in">
      <div className="popup-content">
        <h2>{getGreeting()}</h2>
        <p>Have you eaten yet?</p>
        <div className="buttons">
          <button onClick={handleAdd}>🍽 Add a Meal</button>
          <button onClick={handleView}>📋 View Meals</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;

// Summary:
// What: A friendly onboarding popup that greets users and offers quick shortcuts right after login or page load.
// Why: It personalizes the app experience and encourages immediate interaction. It also helps new users know what actions are available.
// Why use useEffect: To trigger the popup only once on mount (like a welcome message or modal that fades in).
// Why use navigate: Allows redirection to other pages (/add-meal or /) without reloading the page—ideal for a smooth single-page app flow.
// Why dynamic greeting: Adds a personal, warm touch based on the user's time of day.