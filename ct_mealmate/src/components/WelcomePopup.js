// WelcomePopup.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePopup.css';

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true); // Always show on mount
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  const handleAdd = () => {
    setVisible(false);
    navigate('/add-meal');
  };

  const handleView = () => {
    setVisible(false);
    navigate('/');
  };

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
