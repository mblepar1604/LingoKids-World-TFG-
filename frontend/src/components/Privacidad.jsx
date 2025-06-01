import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Privacidad.css';
import '../styles/index.css';

const Privacidad = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="page-wrapper"> {/* nuevo contenedor padre */}
      <div className="dashboard-bg">
        <div
          className="background-wrap"
          style={{ backgroundImage: "url('/img/fondo-privacidad.png')" }}
        >
          <h1 className="dashboard-title">Política de Privacidad</h1>
        </div>
  
        <div className="privacidad-section">
          <h2>1. Introducción</h2>
          <p>En LingoKids World nos tomamos muy en serio la privacidad de nuestros usuarios...</p>
  
          <h2>2. Datos que recopilamos</h2>
          <p>Recopilamos datos mínimos necesarios como nombre, edad del perfil infantil, avatar y progreso en los juegos y cuentos...</p>
  
          <h2>3. Uso de los datos</h2>
          <p>Los datos se usan únicamente para mejorar la experiencia de juego y aprendizaje...</p>
  
          <h2>4. Compartición de información</h2>
          <p>No compartimos los datos con terceros sin consentimiento previo...</p>
  
          <h2>5. Derechos de los usuarios</h2>
          <p>Padres o tutores pueden solicitar acceso, modificación o eliminación de los datos de sus hijos...</p>
  
          <h2>6. Contacto</h2>
          <p>Para cualquier duda, escríbenos desde la sección de <a href="/contacto">Contacto</a>.</p>
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

export default Privacidad;
