import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Juegos.css';

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

const JuegosHTML = ({ categorias, navigate }) => {
  return (
    <div className="dashboard-bg">
      <div className="background-wrap" style={{ backgroundImage: "url('/img/fondo-juegos.png')" }}>
        <h1 className="dashboard-title">Juegos Cognitivos</h1>
      </div>

      <div className="menu-section">
        <div className="menu">
          {categorias.map(cat => (
            <div className="card juegos" key={cat.id} onClick={() => navigate(cat.ruta)}>
              <div className="emoji">{cat.icono}</div>
              <div className="label">{cat.titulo}</div>
              <p className="card-desc">{cat.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Juegos = () => {
  const navigate = useNavigate();

  return <JuegosHTML categorias={categorias} navigate={navigate} />;
};

export default Juegos;