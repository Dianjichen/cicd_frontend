import React from 'react';
import { Outlet , Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;