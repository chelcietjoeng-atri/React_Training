import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function StickyHeader() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();            // clear auth state
    navigate('/login');  // redirect to login page
  };

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
