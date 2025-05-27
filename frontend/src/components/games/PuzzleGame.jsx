import React, { useState, useEffect } from 'react';
import './styles/games/PuzzleGame.css';
import { getPuzzleFrases } from '../utils/cardsData';

const PuzzleGameHTML = ({ frase, seleccionadas, completado, handleSelect, reiniciar }) => {
  return (
    <div className="puzzle-container">
      <h1 className="puzzle-title">Concentration Puzzle</h1>
      <p className="puzzle-sub">Ordena la frase correctamente</p>

      <div className="puzzle-grid">
        {frase.map((p, i) => (
          <button
            key={i}
            className={`puzzle-piece ${seleccionadas.includes(p) ? 'used' : ''}`}
            onClick={() => handleSelect(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="puzzle-result">
        {seleccionadas.map((p, i) => (
          <span key={i} className="pieza-colocada">{p}</span>
        ))}
      </div>

      {completado && (
        <div className="puzzle-win">
          ¡Muy bien! Frase correcta.
          <button className="puzzle-reset" onClick={reiniciar}>Otro puzzle</button>
        </div>
      )}
    </div>
  );
};

const PuzzleGame = () => {
  const [frase, setFrase] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [solucion, setSolucion] = useState([]);
  const [completado, setCompletado] = useState(false);

  useEffect(() => {
    const puzzle = getPuzzleFrases();
    setFrase(puzzle.shuffle);
    setSolucion(puzzle.original);
    setSeleccionadas([]);
    setCompletado(false);
  }, []);

  const handleSelect = (palabra) => {
    if (seleccionadas.includes(palabra)) return;

    const nuevaSeleccion = [...seleccionadas, palabra];
    setSeleccionadas(nuevaSeleccion);

    if (nuevaSeleccion.length === solucion.length) {
      const correcta = nuevaSeleccion.every((pal, i) => pal === solucion[i]);
      setCompletado(correcta);
    }
  };

  const reiniciar = () => {
    const puzzle = getPuzzleFrases();
    setFrase(puzzle.shuffle);
    setSolucion(puzzle.original);
    setSeleccionadas([]);
    setCompletado(false);
  };

  return (
    <PuzzleGameHTML
      frase={frase}
      seleccionadas={seleccionadas}
      completado={completado}
      handleSelect={handleSelect}
      reiniciar={reiniciar}
    />
  );
};

export default PuzzleGame;