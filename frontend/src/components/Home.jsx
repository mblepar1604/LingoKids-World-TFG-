import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/index.css'; // estilos generales
import './styles/Navbar.css'; // puedes mantener los estilos separados si quieres


const Home = () => {
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
    ['/children', 'Añadir hijo'],
    ['/configuracion', 'Configuración'],
    ['/perfil', 'Perfil']
  ];

  const navLinks = user?.es_padre ? linksPadre : linksNino;

  return (
    <div className="dashboard-bg">
      {/* Fondo que incluye todo: navbar, título y avatar */}
      <div
        className="background-wrap"
        style={{ backgroundImage: "url('/img/fondoTFG.png')" }}
      >
        {/* NAVBAR embebido directamente aquí */}
        <nav className="navbar">
          {navLinks.map(([to, label]) => (
            <NavLink key={to} to={to} className="nav-link">
              {label}
            </NavLink>
          ))}
          <button className="logout-btn" onClick={logout}>Salir</button>
        </nav>

        {/* CONTENIDO CENTRAL */}
        <h1 className="dashboard-title">LingoKids World</h1>

        <div className="circles">
          <a href="/progreso" className="circle small link-circle">📈</a>
          <div className="circle large avatar-container">
            <img src="/img/avatar.png" alt="Avatar" className="avatar-img" />
          </div>
          <a href="/amigos" className="circle small link-circle">👥</a>
        </div>
      </div>

      {/* Sección de menú + imágenes decorativas */}
      <div className="menu-section">
        <img src="/img/castillo.png" className="floating float-top-left" alt="castillo" />
        <img src="/img/chuche.png" className="floating float-top-right" alt="chuche" />
        <img src="/img/dinosaurio.webp" className="floating float-bottom-left" alt="dino" />
        <img src="/img/casa.png" className="floating float-bottom-right" alt="casa" />
        <img src="/img/estrella.png" className="floating float-center-top" alt="estrella arriba" />
        <img src="/img/buho.webp" className="floating float-center-bottom" alt="estrella abajo" />

        <div className="menu">
          <div className="card cuentos" onClick={() => window.location.href = '/cuentos'}>
            <div className="emoji">📚</div>
            <div className="label">Mundo de Cuentos</div>
          </div>

          <div className="card juegos" onClick={() => window.location.href = '/juegos'}>
            <div className="emoji">🧠</div>
            <div className="label">Juegos Cognitivos</div>
          </div>

          <div className="card avatar" onClick={() => window.location.href = '/avatar'}>
            <div className="emoji">🧸</div>
            <div className="label">Mi Avatar</div>
          </div>

          <div className="card progreso" onClick={() => window.location.href = '/progreso'}>
            <div className="emoji">🏆</div>
            <div className="label">Progreso y Logros</div>
          </div>
        </div>

      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <p className="footer-text">🌈 LingoKids World © 2025 — Aprende jugando</p>
          <div className="footer-links">
            <a href="/ayuda">❓ Ayuda</a>
            <a href="/contacto">✉️ Contacto</a>
            <a href="/privacidad">🔒 Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
