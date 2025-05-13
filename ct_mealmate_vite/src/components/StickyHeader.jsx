// StickyHeader.jsx
// This is a persistent top navigation header that stays fixed while scrolling.
// It displays the app title, the current user's name, and a logout button when authenticated.

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Used for programmatic navigation
import { useAuth } from '../context/AuthContext'; // Custom auth context to access user and auth functions

function StickyHeader() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth(); // Destructure auth state and functions

  // Called when the user clicks the "Logout" button
  const handleLogout = () => {
    logout();            // Clears user session/auth token
    navigate('/login');  // Redirects back to login page
  };

  return (
    <header
      style={{
        position: 'sticky', // Sticks to top of viewport while scrolling
        top: 0,
        zIndex: 1000, // Makes sure header stays on top of other elements
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1
        onClick={() => navigate('/')}
        style={{
          fontSize: '2.6rem',
          fontWeight: '700',
          color: '#2c3e50',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.15)',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          margin: 0,
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
      >
        🍽️ CT’s MealMate
      </h1>

      {isAuthenticated && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: '600', color: '#34495e' }}>
            👤 {user?.username}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c0392b')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e74c3c')}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default StickyHeader;

// Summary:
// What: Renders a sticky navigation header with branding and user actions.
// Why position: sticky and zIndex: Keeps the header visible at the top as users scroll.
// Why navigate('/'): Provides intuitive navigation by clicking the app title.
// Why conditional isAuthenticated: Only shows user info and logout when logged in.
// Why inline hover effects: Enhances interactivity without needing external CSS.