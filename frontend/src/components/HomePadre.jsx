import React from 'react';
import '../styles/index.css';

const HomePadre = () => {
  // HTML extraído a función aparte
  const renderHomePadre = () => (
    <div className="dashboard-bg">
      {/* Fondo general con título */}
      <div
        className="background-wrap"
        style={{ backgroundImage: "url('/img/fondoTFG.png')" }}
      >
        <h1 className="dashboard-title">LingoKids World - Área Familiar 👨‍👧‍👦</h1>

        <div className="circles">
          <div className="circle large avatar-container">
            <img src="/img/avatar-papa.png" alt="Avatar Padre" className="avatar-img" />
          </div>
        </div>
      </div>

      {/* Menú principal */}
      <div className="menu-section">
        <img src="/img/castillo.png" className="floating float-top-left" alt="castillo" />
        <img src="/img/chuche.png" className="floating float-top-right" alt="chuche" />
        <img src="/img/dinosaurio.webp" className="floating float-bottom-left" alt="dino" />
        <img src="/img/casa.png" className="floating float-bottom-right" alt="casa" />
        <img src="/img/estrella.png" className="floating float-center-top" alt="estrella arriba" />
        <img src="/img/buho.webp" className="floating float-center-bottom" alt="estrella abajo" />

        <div className="menu">
          <div className="card cuentos" onClick={() => window.location.href = '/children'}>
            <div className="emoji">👨‍👧</div>
            <div className="label">Mis Hijos</div>
          </div>

          <div className="card juegos" onClick={() => window.location.href = '/configuracion'}>
            <div className="emoji">⚙️</div>
            <div className="label">Configuración Parental</div>
          </div>

          <div className="card avatar" onClick={() => window.location.href = '/perfil'}>
            <div className="emoji">👤</div>
            <div className="label">Mi Perfil</div>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <p className="footer-text">💼 LingoKids World © 2025 — Gestión familiar inteligente</p>
          <div className="footer-links">
            <a href="/ayuda">❓ Ayuda</a>
            <a href="/contacto">✉️ Contacto</a>
            <a href="/privacidad">🔒 Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );

  return renderHomePadre();
};

export default HomePadre;