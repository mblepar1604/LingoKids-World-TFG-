import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/games/PuzzleGame.css';
import { getPuzzleFrases } from '../../utils/cardsData';
import PlayAgain from './PlayAgain';
import axios from 'axios';

/**
 * PuzzleGameHTML: Vista del juego Puzzle (ordenar frase).
 */
const PuzzleGameHTML = ({
  frase,
  seleccionadas,
  handleSelect,
  completado,
  reiniciar,
  showPlayAgain
}) => {
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

      {completado && <div className="puzzle-win">¡Correcto!</div>}

      {showPlayAgain && (
        <div className="puzzle-footer">
          <PlayAgain onClick={reiniciar} />
        </div>
      )}
    </div>
  );
};

/**
 * PuzzleGame: Lógica del juego Puzzle (ordenar frase).
 *
 * Props esperadas:
 *   - perfilId: id de PerfilInfantil para enviar progreso.
 *   - juegoId: id de Juego correspondiente.
 */
const PuzzleGame = ({ perfilId, juegoId }) => {
  const location = useLocation();
  const idioma = location.state?.idioma || 'es';

  const [frase, setFrase] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [solucion, setSolucion] = useState([]);
  const [completado, setCompletado] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const startTimeRef = useRef(null);

  // Inicia o reinicia el puzzle
  const reiniciar = () => {
    const puzzle = getPuzzleFrases(idioma);
    setFrase(puzzle.shuffle);
    setSolucion(puzzle.original);
    setSeleccionadas([]);
    setCompletado(false);
    setFailedAttempts(0);
    setShowPlayAgain(false);
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    reiniciar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idioma]);

  // Cada vez que el usuario selecciona una palabra
  const handleSelect = palabra => {
    if (seleccionadas.includes(palabra) || completado) return;

    const nueva = [...seleccionadas, palabra];
    setSeleccionadas(nueva);

    // Si completa el largo de la solución, evaluamos si acertó
    if (nueva.length === solucion.length) {
      const acierto = nueva.every((pal, i) => pal === solucion[i]);
      setCompletado(acierto);

      if (!acierto) {
        // si no ordenó correctamente, incrementamos intentos fallidos
        setFailedAttempts(prev => prev + 1);
      }
    }
  };

  // Efecto: se dispara cuando se pone completado en true
  useEffect(() => {
    if (completado) {
      setShowPlayAgain(true);

      // Calcular tiempo en segundos
      const tiempoMs = Date.now() - startTimeRef.current;
      const tiempoSegs = Math.floor(tiempoMs / 1000);

      // Estadísticas a enviar
      const stats = {
        num_words: solucion.length,
        words_solved: solucion.length,
        mistakes: failedAttempts,
        time_seconds: tiempoSegs
      };

      // Enviar progreso al backend
      axios
        .post('/api/progreso/juegos/', {
          perfil_infantil: perfilId,
          juego: juegoId,
          tiempo_jugado: tiempoSegs,
          estadisticas: stats
        })
        .catch(err => {
          console.error('Error enviando progreso PuzzleGame:', err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completado]);

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

      {completado && <div className="puzzle-win">¡Correcto!</div>}

      {showPlayAgain && (
        <div className="puzzle-footer">
          <PlayAgain onClick={reiniciar} />
        </div>
      )}

      {/* Añadir el Footer */}
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

export default PuzzleGame;