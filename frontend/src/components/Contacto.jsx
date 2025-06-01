import React, { useState } from 'react';
import './styles/contacto.css';
import '../styles/index.css';

const ContactPage = () => {
  const [formulario, setFormulario] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="contacto-wrapper">
      {/* ENCABEZADO CON IMAGEN DE FONDO */}
      <div
        className="encabezado-contacto"
        style={{
          backgroundImage: 'url("/img/fondo-contacto.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px 60px',
          textAlign: 'center',
        }}
      >
        <h1 className="dashboard-title">Contacto</h1>
      </div>

      {/* SECCIÓN CENTRAL */}
      <div className="contacto-background">
        <div className="contacto-grid">
          <div className="contacto-info">
            <h2>📞 ¿Necesitas ayuda?</h2>
            <p>Si tienes preguntas sobre LingoKids World, nuestros juegos o el progreso de tus hijos:</p>
            <ul>
              <li><strong>Email:</strong> contacto@lingokidsworld.com</li>
              <li><strong>Teléfono:</strong> +34 636 244 147</li>
              <li><strong>Dirección:</strong> Calle Alhondiga, 12, Granada</li>
            </ul>
            <p>También puedes usar el formulario para enviarnos tu mensaje directamente. ¡Te responderemos lo antes posible!</p>
          </div>

          <div className="contacto-formulario">
            <h2>✉️ Enviar un mensaje</h2>
            {!enviado ? (
              <form className="formulario-contacto" onSubmit={handleSubmit}>
                <label>
                  Nombre:
                  <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                </label>
                <label>
                  Correo electrónico:
                  <input type="email" name="email" value={formulario.email} onChange={handleChange} required />
                </label>
                <label>
                  Mensaje:
                  <textarea name="mensaje" value={formulario.mensaje} onChange={handleChange} required />
                </label>
                <button type="submit">Enviar mensaje</button>
              </form>
            ) : (
              <div className="mensaje-enviado">
                <p>🎉 ¡Gracias por tu mensaje!</p>
                <p>Te responderemos pronto 😊</p>
              </div>
            )}
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

export default ContactPage;
