// MealStatsModal.js
// This component displays a modal popup containing the MealStatsChart.
// It allows filtering meals by week or by favorites, and can be opened/closed via props.

import React from 'react';
import MealStatsChart from './MealStatsChart'; // Import the reusable chart component

// Inline styles for modal overlay (dark background covering full screen)
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black
  zIndex: 999, // Ensure it's above other content
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// Inline styles for modal content container
const modalStyle = {
  background: 'white',
  borderRadius: '1rem',
  padding: '1.5rem',
  width: '90%',
  maxWidth: '700px', // Responsive width constraint
  maxHeight: '90vh', // Prevent modal from going off-screen
  overflowY: 'auto', // Enable scroll if content overflows
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  animation: 'fadeIn 0.2s ease-out', // Smooth entrance animation
};

const MealStatsModal = ({ meals, isOpen, onClose, filterWeek = false, filterFavorites = false }) => {
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Modal background overlay; clicking it closes the modal
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
          filterWeek={filterWeek} // Passed to filter meals by date
          filterFavorites={filterFavorites} // Passed to show only favorite meals
        />
      </div>
    </div>
  );
};

export default MealStatsModal;

// Summary:
// What: Renders a modal popup with a chart showing meal data by category.
// Why: Provides users with a focused view of meal stats without cluttering the main UI.
// Why conditional isOpen: Prevents rendering when modal isn’t needed, improving performance and preventing UI glitches.
// Why e.stopPropagation(): Ensures clicking inside the modal doesn’t accidentally close it.
// Why filterWeek and filterFavorites: Makes the chart more useful by letting users drill down into relevant subsets of data.