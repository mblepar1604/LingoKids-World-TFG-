import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import Login from '../components/Login';
import Registro from '../components/Registro';
import AddChildPage from '../components/AddChildPage';
import Juegos from '../components/Juegos';
import MemoryGame from '../components/games/MemoryGame';
import SimonGame from '../components/games/SimonGame';
import MatchingGame from '../components/games/MatchingGame';
import Puzzle from '../components/games/PuzzleGame';
import SnakeGame from '../components/games/SnakeGame';
import WhackAMole from '../components/games/WhackAMole';
import Cuentos from '../components/Cuentos';
import Avatar from '../components/Avatar';
import Progreso from '../components/Progreso';
import ConfiguracionParental from '../components/ConfiguracionParental';
import Perfil from '../components/Perfil';
import NotFound from '../components/NotFound';
import Ayuda from '../components/Ayuda';

import PrivateRoute from './PrivateRoute';
import HeaderNavigation from '../components/HeaderNavigation';
import HomePadre from '../components/HomePadre';
import Home from '../components/Home';

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Rutas sin navegación
  const noNavbarRoutes = ['/login', '/registro'];
  const hideHeader = noNavbarRoutes.includes(location.pathname);

  // Decide qué home mostrar en /
  const getHomeComponent = () => {
    if (!user) return <Navigate to="/login" />;
    return user.es_padre ? <HomePadre /> : <Home />;
  };

  return (
    <>
      {!hideHeader && <HeaderNavigation />}

      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Privadas comunes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={getHomeComponent()} />
          <Route path="/cuentos" element={<Cuentos />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="/juegos/memory" element={<MemoryGame />} />
          <Route path="/juegos/secuencia" element={<SimonGame />} />
          <Route path="/juegos/matching" element={<MatchingGame />} />
          <Route path="/juegos/puzzles" element={<Puzzle />} />
          <Route path="/juegos/snake" element={<SnakeGame />} />
          <Route path="/juegos/whackamole" element={<WhackAMole />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/progreso" element={<Progreso />} />
          <Route path="/ayuda" element={<Ayuda />} />
        </Route>

        {/* Solo padres */}
        <Route element={<PrivateRoute role="padre" />}>
          <Route path="/children" element={<AddChildPage />} />
          <Route path="/configuracion" element={<ConfiguracionParental />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
