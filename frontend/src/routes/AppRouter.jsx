import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
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
import ProgresoYLogros from '../components/ProgresoYLogros';
import ConfiguracionParental from '../components/ConfiguracionParental';
import Perfil from '../components/Perfil';
import NotFound from '../components/NotFound';
import Ayuda from '../components/Ayuda';
import PrivateRoute from './PrivateRoute';
import HeaderNavigation from '../components/HeaderNavigation';
import HomePadre from '../components/HomePadre';
import Home from '../components/Home';

/**
 * Wrapper para extraer el parámetro :perfilId de la URL
 * y pasarlo como prop a ProgresoYLogros.
 */
const ProgresoWrapper = () => {
  const { perfilId } = useParams();
  // Convertimos a número (si lo necesitas como número)
  const idNum = parseInt(perfilId, 10);
  return <ProgresoYLogros perfilId={idNum} />;
};

const AppRouter = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Obtener idioma de la navegación para juegos multilingües
  const idioma = location.state?.idioma || 'es';

  // Mientras AuthContext está cargando (consultando /api/users/me/), no renderizamos nada
  if (loading) {
    return null; // ó un spinner si lo prefieres
  }

  // Si no hay user (no está autenticado), siempre mostramos login/registro
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {/* Cualquier otra ruta redirige a /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // A partir de aquí sabemos que user ya está definido (hay un usuario autenticado)
  const perfilId = user.perfilInfantilId;

  // Rutas sin navegación
  const noNavbarRoutes = ['/login', '/registro'];
  const hideHeader = noNavbarRoutes.includes(location.pathname);

  // Decide qué Home mostrar en "/"
  const getHomeComponent = () => {
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

          {/* Rutas de juegos, solo si el usuario es infantil */}
          {user.es_infantil && (
            <>
              <Route
                path="/juegos/memory"
                element={<MemoryGame perfilId={perfilId} juegoId={2} idioma={idioma} />}
              />
              <Route
                path="/juegos/secuencia"
                element={<SimonGame perfilId={perfilId} juegoId={4} />}
              />
              <Route
                path="/juegos/matching"
                element={<MatchingGame perfilId={perfilId} juegoId={1} idioma={idioma} />}
              />
              <Route
                path="/juegos/puzzles"
                element={<Puzzle perfilId={perfilId} juegoId={3} idioma={idioma} />}
              />
              <Route
                path="/juegos/snake"
                element={<SnakeGame perfilId={perfilId} juegoId={5} />}
              />
              <Route
                path="/juegos/whackamole"
                element={<WhackAMole perfilId={perfilId} juegoId={6} />}
              />
            </>
          )}

          <Route path="/avatar" element={<Avatar />} />
          <Route path="/progreso/:perfilId" element={<ProgresoWrapper />} />
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