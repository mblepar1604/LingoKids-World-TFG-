import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Login from '../components/Login';
import Registro from '../components/Registro';
import AddChildPage from '../components/AddChildPage';
import Juegos from '../components/Juegos';
import Cuentos from '../components/Cuentos';
import Avatar from '../components/Avatar';
import Progreso from '../components/Progreso';
import ConfiguracionParental from '../components/ConfiguracionParental';
import NotFound from '../components/NotFound';

import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Oculta Navbar en estas rutas
  const noNavbarRoutes = ['/login', '/registro'];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas privadas comunes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/cuentos" element={<Cuentos />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/progreso" element={<Progreso />} />
        </Route>

        {/* Rutas solo para padres */}
        <Route element={<PrivateRoute role="padre" />}>
          <Route path="/children" element={<AddChildPage />} />
          <Route path="/configuracion" element={<ConfiguracionParental />} />
          <Route path="/perfil" element={<Navigate to="/" replace />} />
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;