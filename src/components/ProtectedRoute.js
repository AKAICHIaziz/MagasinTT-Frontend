import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const token = sessionStorage.getItem('token');
  let hasAccess = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      //const userRole = decodedToken.isAdmin ? 'admin' : (decodedToken.isStoreAdmin ? 'storeAdmin' : 'employee');
      let userRole;
      if (decodedToken.isAdmin) {
        userRole = 'admin';
      } else if (decodedToken.isStoreAdmin) {
        userRole = 'storeAdmin';
      } else {
        userRole = 'employee';
      }

      hasAccess = allowedRoles.includes(userRole);
    } catch (e) {
      console.error('Token decode error:', e);
    }
  }

  return hasAccess ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
