import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './styles/HeaderNavigation.css';

const HeaderNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const isHome = location.pathname === '/';

  return (
    <header className="header-nav">
      {!isHome && (
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      )}
      <button className="logout-btn" onClick={logout}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default HeaderNavigation;