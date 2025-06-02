import React, { useState, useEffect, useRef } from 'react';
import '../styles/games/WhackAMole.css';
import axios from 'axios';

/**
 * WhackAMoleHTML: Vista de Whack-a-Mole.
 */
const WhackAMoleHTML = ({
  moles,
  score,
  lives,
  gameOver,
  handleHit,
  missHits,
  restartGame,
  showPlayAgain
}) => {
  return (
    <div className="whack-a-mole-container">
      <h1 className="whack-title">Whack-a-Mole</h1>
      <div className="whack-info">
        <p className="whack-score">Puntuación: {score}</p>
        <div className="hearts">
          {Array.from({ length: lives }).map((_, i) => (
            <img key={i} src="/img/games/corazon.png" alt="life" className="heart" />
          ))}
        </div>
      </div>
      {gameOver && showPlayAgain && (
        <div className="game-over">
          ¡Juego Terminado! <button onClick={restartGame}>Jugar de Nuevo</button>
        </div>
      )}
      <div className="whack-grid">
        {moles.map((isMole, index) => (
          <div
            key={index}
            className={`whack-hole ${isMole ? 'mole' : ''}`}
            onClick={() => handleHit(index)}
          >
            {isMole && <img src="/img/games/topo.png" alt="Mole" className="mole-image" />}
            {missHits[index] && <img src="/img/games/x.png" alt="Miss" className="miss-image" />}
          </div>
        ))}
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

/**
 * WhackAMole: Lógica principal de Whack-a-Mole.
 *
 * Props esperadas:
 *   - perfilId: id de PerfilInfantil para enviar progreso.
 *   - juegoId: id de Juego correspondiente.
 */
const WhackAMole = ({ perfilId, juegoId }) => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [missHits, setMissHits] = useState(Array(9).fill(false));
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const gameOverRef = useRef(gameOver);
  const moleTimeoutRef = useRef(null);
  const intervalTimeRef = useRef(1200); // 1.2s inicial
  const hitSoundRef = useRef(null);
  const missSoundRef = useRef(null);

  // Para medir tiempo de partida
  const startTimeRef = useRef(Date.now());
  const hasSentProgressRef = useRef(false);

  // Sincronizar gameOverRef con estado gameOver
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  // Cargar sonidos al montar
  useEffect(() => {
    hitSoundRef.current = new Audio('/sounds/hit.mp3');
    missSoundRef.current = new Audio('/sounds/miss.mp3');
    // Iniciar el primer topo
    startMoleTimer();
    return () => stopMoleTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const randomMolePosition = () => {
    const index = Math.floor(Math.random() * 9);
    const arr = Array(9).fill(false);
    arr[index] = true;
    return arr;
  };

  // Muestra un topo y programa el siguiente spawn
  const spawnMole = () => {
    if (gameOverRef.current) return;
    setMoles(randomMolePosition());
    intervalTimeRef.current = Math.max(500, intervalTimeRef.current - 50);
    moleTimeoutRef.current = setTimeout(spawnMole, intervalTimeRef.current);
  };

  const startMoleTimer = () => {
    if (gameOverRef.current) return;
    intervalTimeRef.current = 1200;
    clearTimeout(moleTimeoutRef.current);
    spawnMole();
  };

  const stopMoleTimer = () => {
    clearTimeout(moleTimeoutRef.current);
    moleTimeoutRef.current = null;
  };

  // Cada vez que el jugador "pega" (hit) o "falla" (miss), actualizamos estado
  const handleHit = index => {
    if (gameOverRef.current) return;
    if (moles[index]) {
      // Golpe exitoso
      hitSoundRef.current.currentTime = 0;
      hitSoundRef.current.play();
      setScore(prev => prev + 1);
      setMoles(Array(9).fill(false));
    } else {
      // Golpe fallido
      stopMoleTimer();
      missSoundRef.current.currentTime = 0;
      missSoundRef.current.play();
      setMissHits(prev => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
      });
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setShowPlayAgain(true);
          return 0;
        }
        return newLives;
      });
      // Quitar la X luego de 800ms y reanudar
      setTimeout(() => {
        setMissHits(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
        if (!gameOverRef.current) startMoleTimer();
      }, 800);
    }
  };

  // Detectar Game Over: enviar progreso
  useEffect(() => {
    if (gameOver) {
      if (!hasSentProgressRef.current) {
        hasSentProgressRef.current = true;
        const tiempoMs = Date.now() - startTimeRef.current;
        const tiempoSegs = Math.floor(tiempoMs / 1000);

        const stats = {
          score: score,
          lives_left: 0,
          time_seconds: tiempoSegs
        };

        axios
          .post('/api/progreso/juegos/', {
            perfil_infantil: perfilId,
            juego: juegoId,
            tiempo_jugado: tiempoSegs,
            estadisticas: stats
          })
          .catch(err => console.error('Error enviando progreso WhackAMole:', err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const restartGame = () => {
    stopMoleTimer();
    setGameOver(false);
    gameOverRef.current = false;
    setMoles(Array(9).fill(false));
    setScore(0);
    setLives(3);
    setMissHits(Array(9).fill(false));
    setShowPlayAgain(false);
    hasSentProgressRef.current = false;
    startTimeRef.current = Date.now();
    startMoleTimer();
  };

  return (
    <WhackAMoleHTML
      moles={moles}
      score={score}
      lives={lives}
      gameOver={gameOver}
      handleHit={handleHit}
      missHits={missHits}
      restartGame={restartGame}
      showPlayAgain={showPlayAgain}
    />
  );
};

export default WhackAMole;