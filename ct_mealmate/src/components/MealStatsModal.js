// src/components/MealStatsModal.js
import React from 'react';
import MealStatsChart from './MealStatsChart';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  background: 'white',
  borderRadius: '1rem',
  padding: '1.5rem',
  width: '90%',
  maxWidth: '700px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  animation: 'fadeIn 0.2s ease-out',
};

const MealStatsModal = ({ meals, isOpen, onClose, filterWeek = false, filterFavorites = false }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            float: 'right',
            background: 'transparent',
            border: 'none',
            fontSize: '1.4rem',
            cursor: 'pointer',
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <MealStatsChart
          meals={meals}
          filterWeek={filterWeek}
          filterFavorites={filterFavorites}
        />
      </div>
    </div>
  );
};

export default MealStatsModal;
