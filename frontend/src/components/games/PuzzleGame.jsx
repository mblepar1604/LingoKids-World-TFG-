import React, { useState, useEffect } from 'react';
import '../styles/games/PuzzleGame.css';
import { getPuzzleFrases } from '../../utils/cardsData';
import PlayAgain from './PlayAgain';
import LanguageSelect from './LanguageSelect';

const PuzzleGameHTML = ({ frase, seleccionadas, handleSelect, completado, reiniciar }) => {
  return (
    <div className="puzzle-container">
      <LanguageSelect
        idioma=""
        traduccion=""
        onIdiomaChange={() => {}}
        onTraduccionChange={() => {}}
      />
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

      {completado && <div className="puzzle-win">¡Correcto!</div>}

      <div className="puzzle-footer">
        <PlayAgain onClick={reiniciar} />
      </div>
    </div>
  );
};

const PuzzleGame = () => {
  const [frase, setFrase] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [solucion, setSolucion] = useState([]);
  const [completado, setCompletado] = useState(false);
  const [idioma, setIdioma] = useState('en');

  const reiniciar = () => {
    const puzzle = getPuzzleFrases();
    setFrase(puzzle.shuffle);
    setSolucion(puzzle.original);
    setSeleccionadas([]);
    setCompletado(false);
  };

  useEffect(() => {
    reiniciar();
  }, [idioma]);

  const handleSelect = palabra => {
    if (seleccionadas.includes(palabra)) return;
    const nueva = [...seleccionadas, palabra];
    setSeleccionadas(nueva);
    if (nueva.length === solucion.length) {
      setCompletado(nueva.every((pal, i) => pal === solucion[i]));
    }
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