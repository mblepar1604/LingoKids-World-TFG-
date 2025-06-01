import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/games/MemoryGame.css';
import { getMemoryCards } from '../../utils/cardsData';
import PlayAgain from './PlayAgain';
import axios from 'axios';

/**
 * MemoryGameHTML: Vista del juego de memoria.
 */
const MemoryGameHTML = ({
  cards,
  flipped,
  matched,
  handleFlip,
  reiniciar,
  transitionsEnabled,
  showPlayAgain
}) => {
  return (
    <div className={`memory-container ${transitionsEnabled ? 'transitions-enabled' : ''}`}>
      <h1 className="memory-title">Memory Multilingüe</h1>
      {/* LanguageSelect eliminado */}
      <div className="memory-grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(card.id);
          return (
            <div
              key={index}
              className={`memory-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(index)}
            >
              <div className="memory-front">
                {card.type === 'img'
                  ? <img src={card.content} alt="img" />
                  : <span>{card.content}</span>
                }
              </div>
              <div className="memory-back">?</div>
            </div>
          );
        })}
      </div>

      <div className="memory-footer">
        {showPlayAgain && (
          <PlayAgain onClick={reiniciar} />
        )}
      </div>
    </div>
  );
};

/**
 * MemoryGame: Lógica principal del juego de memoria.
 *
 * Props esperadas:
 *   - perfilId: id de PerfilInfantil para enviar progreso.
 *   - juegoId: id de Juego correspondiente.
 */
const MemoryGame = ({ perfilId, juegoId }) => {
  const location = useLocation();
  const idioma = location.state?.idioma || 'es';

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);
  const [transitionsEnabled, setTransitionsEnabled] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const startTimeRef = useRef(null);

  // Inicializa o reinicia el juego
  const reiniciar = () => {
    setTransitionsEnabled(false);
    const nuevas = getMemoryCards(idioma);
    setCards(nuevas);
    setFlipped([]);
    setMatched([]);
    setBloqueado(false);
    setFailedAttempts(0);
    setShowPlayAgain(false);

    // Reactivar transiciones justo después de tapar cartas
    setTimeout(() => setTransitionsEnabled(true), 100);

    startTimeRef.current = Date.now();
  };

  // Carga inicial y cada vez que cambia idioma o traducción
  useEffect(() => {
    reiniciar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idioma]);

  // Habilitar transiciones tras el primer render
  useEffect(() => {
    setTimeout(() => setTransitionsEnabled(true), 0);
  }, []);

  // Efecto: si todas las parejas fueron encontradas, termina el juego
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (totalPairs > 0 && matched.length === totalPairs) {
      setShowPlayAgain(true);

      // Calcular tiempo en segundos
      const tiempoMs = Date.now() - startTimeRef.current;
      const tiempoSegs = Math.floor(tiempoMs / 1000);

      // Construir estadísticas
      const stats = {
        total_pairs: totalPairs,
        pairs_found: matched.length,
        failed_attempts: failedAttempts,
        time_seconds: tiempoSegs
      };

      // Enviar al backend
      axios
        .post('/api/progreso/juegos/', {
          perfil_infantil: perfilId,
          juego: juegoId,
          tiempo_jugado: tiempoSegs,
          estadisticas: stats
        })
        .catch(err => console.error('Error enviando progreso MemoryGame:', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched]);

  const handleFlip = index => {
    if (bloqueado || flipped.includes(index) || matched.includes(cards[index].id)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setBloqueado(true);
      setTimeout(() => {
        const [i, j] = newFlipped;
        if (cards[i].id === cards[j].id && cards[i].type !== cards[j].type) {
          setMatched(prev => [...prev, cards[i].id]);
        } else {
          // Si no coincidieron, sumar un fallo
          setFailedAttempts(prev => prev + 1);
        }
        setFlipped([]);
        setBloqueado(false);
      }, 1000);
    }
  };

  return (
    <MemoryGameHTML
      cards={cards}
      flipped={flipped}
      matched={matched}
      handleFlip={handleFlip}
      reiniciar={reiniciar}
      transitionsEnabled={transitionsEnabled}
      showPlayAgain={showPlayAgain}
    />
  );
};

export default MemoryGame;