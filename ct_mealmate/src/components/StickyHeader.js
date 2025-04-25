// StickyHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StickyHeader() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        textAlign: 'center',
      }}
    >
      <h1
        onClick={() => navigate('/')}
        style={{
            fontSize: '2.6rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#2c3e50',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.15)',
            letterSpacing: '0.5px',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
      >
        🍽️ CT’s MealMate
      </h1>
    </header>
  );
}

export default StickyHeader;
