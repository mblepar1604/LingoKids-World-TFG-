import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ role }) => {
  const { user } = useContext(AuthContext);

  // Si no estás logueado, vas a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si necesitas un rol concreto y no coincide, redirige a Home
  if (role === 'padre' && !user.es_padre) {
    return <Navigate to="/" replace />;
  }
  if (role === 'nino' && !user.es_infantil) {
    return <Navigate to="/" replace />;
  }

  // Si todo OK, renderiza la ruta hija
  return <Outlet />;
};

export default PrivateRoute;