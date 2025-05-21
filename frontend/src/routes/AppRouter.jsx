import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../componentes/Home';
import Login from '../componentes/Login';
import Registro from '../componentes/Registro';
import Juegos from '../componentes/Juegos';
import Cuentos from '../componentes/Cuentos';
import Avatar from '../componentes/Avatar';
import Progreso from '../componentes/Progreso';
import ConfiguracionParental from '../componentes/ConfiguracionParental';
import NotFound from '../pages/NotFound';

import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../contexts/AuthContext';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Privadas (cualquier usuario autenticado) */}
      <Route element={<PrivateRoute user={user} />}>
        <Route path="/" element={<Home />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/cuentos" element={<Cuentos />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/progreso" element={<Progreso />} />
      </Route>

      {/* Solo padres */}
      <Route element={<PrivateRoute user={user} role="padre" />}>
        <Route path="/configuracion" element={<ConfiguracionParental />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
