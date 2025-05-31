import React, { useState, useEffect, useRef } from 'react';
import '../styles/games/WhackAMole.css';

const WhackAMoleHTML = ({ moles, score, lives, gameOver, handleHit, missHits, restartGame }) => {
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
      {gameOver && (
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
    </div>
  );
};

const WhackAMole = () => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [missHits, setMissHits] = useState(Array(9).fill(false));

  const gameOverRef = useRef(gameOver);
  const moleTimeoutRef = useRef(null);
  const intervalTimeRef = useRef(1200); // Start at 1.2s
  const hitSoundRef = useRef(null);
  const missSoundRef = useRef(null);

  // Sync ref with state
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  // Initialize sounds
  useEffect(() => {
    hitSoundRef.current = new Audio('/sounds/hit.mp3');
    missSoundRef.current = new Audio('/sounds/miss.mp3');
  }, []);

  // Start initial mole spawn
  useEffect(() => {
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

  const spawnMole = () => {
    if (gameOverRef.current) return;
    // Show a single mole
    setMoles(randomMolePosition());
    // Decrease interval time by 50ms, but not below 500ms
    intervalTimeRef.current = Math.max(500, intervalTimeRef.current - 50);
    // Schedule next mole
    moleTimeoutRef.current = setTimeout(spawnMole, intervalTimeRef.current);
  };

  const startMoleTimer = () => {
    if (gameOverRef.current) return;
    // Reset interval time to max
    intervalTimeRef.current = 1200;
    // Immediately spawn first mole
    clearTimeout(moleTimeoutRef.current);
    spawnMole();
  };

  const stopMoleTimer = () => {
    clearTimeout(moleTimeoutRef.current);
    moleTimeoutRef.current = null;
  };

  const handleHit = index => {
    if (gameOverRef.current) return;
    if (moles[index]) {
      // Hit mole
      hitSoundRef.current.currentTime = 0;
      hitSoundRef.current.play();
      setScore(prev => prev + 1);
      setMoles(Array(9).fill(false));
    } else {
      // Miss
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
          return 0;
        }
        return newLives;
      });
      // After sound ends (~800ms), remove X and restart
      const ms = 800;
      setTimeout(() => {
        setMissHits(prev => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
        if (!gameOverRef.current) startMoleTimer();
      }, ms);
    }
  };

  const restartGame = () => {
    stopMoleTimer();
    setGameOver(false);
    gameOverRef.current = false;
    setMoles(Array(9).fill(false));
    setScore(0);
    setLives(3);
    setMissHits(Array(9).fill(false));
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
    />
  );
};

export default WhackAMole;