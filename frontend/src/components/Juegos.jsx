import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Juegos.css';
import LanguageSelector from './games/LanguageSelect';

const categorias = [
  {
    id: 'memory',
    titulo: 'Memory Cards',
    descripcion: 'Memoriza palabras e imágenes en varios idiomas',
    icono: '🃏',
    ruta: '/juegos/memory'
  },
  {
    id: 'secuencia',
    titulo: 'Secuencia de Sonidos',
    descripcion: 'Juegos estilo Simón dice',
    icono: '🔊',
    ruta: '/juegos/secuencia'
  },
  {
    id: 'matching',
    titulo: 'Matching Words',
    descripcion: 'Empareja palabras e imágenes',
    icono: '🔤',
    ruta: '/juegos/matching'
  },
  {
    id: 'puzzles',
    titulo: 'Concentration Puzzles',
    descripcion: 'Refuerza gramática y atención',
    icono: '🧩',
    ruta: '/juegos/puzzles'
  },
  {
    id: 'snake',
    titulo: 'Snake Game',
    descripcion: 'Controla la serpiente y come manzanas',
    icono: '🐍',
    ruta: '/juegos/snake'
  },
  {
    id: 'whackamole',
    titulo: 'Whack-a-Mole',
    descripcion: 'Golpea a los topos antes de que desaparezcan',
    icono: '🔨',
    ruta: '/juegos/whackamole'
  }
];

const JuegosHTML = ({ categorias, navigate, idioma, setIdioma }) => {
  return (
    <div className="dashboard-bg">
      <div className="background-wrap" style={{ backgroundImage: "url('/img/fondo-juegos.png')" }}>
        <h1 className="dashboard-title">Juegos Cognitivos</h1>
      </div>

      <div className="menu-section">
        <LanguageSelector idioma={idioma} setIdioma={setIdioma} />
        <div className="menu">
          {categorias.map(cat => (
            <div
              className="card juegos"
              key={cat.id}
              onClick={() => navigate(cat.ruta, { state: { idioma } })}
            >
              <div className="emoji">{cat.icono}</div>
              <div className="label">{cat.titulo}</div>
              <p className="card-desc">{cat.descripcion}</p>
            </div>
          ))}
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

const Juegos = () => {
  const navigate = useNavigate();
  const [idioma, setIdioma] = useState('es');

  return <JuegosHTML categorias={categorias} navigate={navigate} idioma={idioma} setIdioma={setIdioma} />;
};

export default Juegos;