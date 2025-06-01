import React, { useContext } from 'react'; 
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // Esperamos a que AuthContext termine de cargar

  if (!user) return <Navigate to="/login" replace />;

  if (role === 'padre' && !user.es_padre) return <Navigate to="/" replace />;
  if (role === 'nino' && !user.es_infantil) return <Navigate to="/" replace />;

  return <Outlet />; 
};

export default PrivateRoute;