import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const linksNino = [
    ['/', 'Home'],
    ['/cuentos', 'Cuentos'],
    ['/juegos', 'Juegos'],
    ['/progreso', 'Progreso'],
    ['/avatar', 'Avatar']
  ];

  const linksPadre = [
    ['/', 'Home'],
    ['/children', 'Añadir hijo'],            // determina que /children muestre Home con formulario
    ['/configuracion', 'Configuración'],
    ['/perfil', 'Perfil']
  ];

  const navLinks = user?.es_padre ? linksPadre : linksNino;

  return (
    <nav className="navbar">
      {navLinks.map(([to, label]) => (
        <NavLink key={to} to={to} className="nav-link">{label}</NavLink>
      ))}
      <button className="logout-btn" onClick={logout}>Salir</button>
    </nav>
  );
};

export default Navbar;