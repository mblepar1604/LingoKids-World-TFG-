import React, { useState, useEffect } from 'react';
import '../styles/games/PuzzleGame.css';
import { getPuzzleFrases } from '../../utils/cardsData';
import PlayAgain from '../PlayAgain';
import LanguageSelect from '../LanguageSelect';

const PuzzleGameHTML = ({ frase, seleccionadas, handleSelect }) => {
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
    const puzzle = getPuzzleFrases(); // podría adaptarse por idioma en el futuro
    setFrase(puzzle.shuffle);
    setSolucion(puzzle.original);
    setSeleccionadas([]);
    setCompletado(false);
  };

  useEffect(() => {
    reiniciar();
  }, [idioma]);

  const handleSelect = (palabra) => {
    if (seleccionadas.includes(palabra)) return;

    const nuevaSeleccion = [...seleccionadas, palabra];
    setSeleccionadas(nuevaSeleccion);

    if (nuevaSeleccion.length === solucion.length) {
      const correcta = nuevaSeleccion.every((pal, i) => pal === solucion[i]);
      setCompletado(correcta);
    }
  };

  return (
    <>
      <LanguageSelect idioma={idioma} traduccion={idioma} onIdiomaChange={setIdioma} onTraduccionChange={() => {}} />
      <PuzzleGameHTML
        frase={frase}
        seleccionadas={seleccionadas}
        completado={completado}
        handleSelect={handleSelect}
      />
      <PlayAgain onClick={reiniciar} />
    </>
  );
};

export default PuzzleGame;