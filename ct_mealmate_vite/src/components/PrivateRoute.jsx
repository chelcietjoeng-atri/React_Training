// PrivateRoute.js
// This component protects routes from unauthenticated access.
// If the user is not logged in, they are redirected to the login page.

import React from 'react';
import { Navigate } from 'react-router-dom'; // Used to redirect users
import { useAuth } from '../context/AuthContext'; // Custom hook to access auth state

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Check if the user is logged in

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the protected route
  return children;
}

// Summary:
// What: Prevents unauthorized users from accessing protected pages.
// Why useAuth: It provides the isAuthenticated boolean from global context, keeping logic centralized and reusable.
// Why Navigate: Cleanly redirects unauthenticated users to the /login route.
// Why children: It wraps the protected component.