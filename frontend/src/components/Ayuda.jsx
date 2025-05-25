import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Ayuda.css';
import './styles/Navbar.css';
import '../styles/index.css';

const preguntas = [
  {
    titulo: "¿Cómo accedo a los cuentos?",
    respuesta: "Puedes acceder desde la sección 'Cuentos' en el menú principal. Solo haz clic en el cuento que quieras y se abrirá una ventana para leerlo."
  },
  {
    titulo: "¿Qué es un cuento personalizable?",
    respuesta: "Es un cuento que permite modificar el nombre del protagonista para adaptarlo al lector o lectora."
  },
  {
    titulo: "¿Puedo guardar mi progreso?",
    respuesta: "Sí, el sistema recuerda qué cuentos has leído y tus logros se registran en la sección de Progreso."
  },
  {
    titulo: "¿Cómo cambio mi avatar?",
    respuesta: "Ve a la sección 'Avatar' desde el menú y selecciona las opciones de personalización que más te gusten."
  },
  {
    titulo: "¿Qué hago si tengo problemas técnicos?",
    respuesta: "Puedes escribirnos desde la sección de Contacto o consultar con un adulto responsable para que te ayude a comunicar el problema."
  }
];

const Ayuda = () => {
  const [abierta, setAbierta] = useState(null);
  const { user, logout } = useContext(AuthContext);

  const togglePregunta = (index) => {
    setAbierta(abierta === index ? null : index);
  };

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
      {/* Fondo del header con imagen personalizada */}
        <div
        className="background-wrap"
        style={{ backgroundImage: "url('/img/fondo-ayuda.png')" }}
        >
        {/* NAVBAR dentro del fondo */}
        <nav className="navbar">
            {navLinks.map(([to, label]) => (
            <NavLink key={to} to={to} className="nav-link">{label}</NavLink>
            ))}
            <button className="logout-btn" onClick={logout}>Salir</button>
        </nav>

        <h1 className="dashboard-title">Centro de Ayuda</h1>
        </div>
      <div className="ayuda-section">

        {preguntas.map((item, index) => (
          <div
            key={index}
            className={`faq-card ${abierta === index ? 'open' : ''}`}
            onClick={() => togglePregunta(index)}
          >
            <h2>{item.titulo}</h2>
            <p>{item.respuesta}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
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

export default Ayuda;
