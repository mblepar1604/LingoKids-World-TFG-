import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ role }) => {
  const { user } = useContext(AuthContext);

  // 1) Si no hay usuario: al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2) Si pides un rol concreto (p. ej. padre) y no coincide:
  if (role && user.rol !== role) {
    // redirige a Home si el rol no cuadra
    return <Navigate to="/" replace />;
  }

  // 3) Si todo ok, renderiza la ruta hija
  return <Outlet />;
};

export default PrivateRoute;
