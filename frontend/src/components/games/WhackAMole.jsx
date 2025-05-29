import React, { useState, useEffect } from 'react';
import '../styles/games/WhackAMole.css';

const WhackAMoleHTML = ({ moles, score, timeLeft, gameOver, handleHit, restartGame }) => {
  return (
    <div className="whack-a-mole-container">
      <h1 className="whack-title">Whack-a-Mole</h1>
      <p className="whack-score">Puntuación: {score}</p>
      <p className="whack-timer">Tiempo restante: {timeLeft}s</p>
      {gameOver && <div className="game-over">¡Juego Terminado! <button onClick={restartGame}>Jugar de Nuevo</button></div>}
      <div className="whack-grid">
        {moles.map((isMole, index) => (
          <div
            key={index}
            className={`whack-hole ${isMole ? 'mole' : ''}`}
            onClick={() => handleHit(index)}
          >
            {isMole && <img src="/img/games/topo.png" alt="Mole" className="mole-image" />}
          </div>
        ))}
      </div>
    </div>
  );
};

const WhackAMole = () => {
  const [moles, setMoles] = useState(Array(9).fill(false)); // 9 agujeros
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 segundos de juego

  useEffect(() => {
    const timer = setInterval(() => {
      setMoles(moles.map(() => Math.random() < 0.3)); // 30% de probabilidad de que aparezca un topo
    }, 800);

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(countdown);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(countdown);
    };
  }, []);

  const handleHit = (index) => {
    if (moles[index]) {
      setScore(score + 1);
      const newMoles = [...moles];
      newMoles[index] = false; // Eliminar el topo golpeado
      setMoles(newMoles);
    }
  };

  const restartGame = () => {
    setMoles(Array(9).fill(false));
    setScore(0);
    setGameOver(false);
    setTimeLeft(30);
  };

  return (
    <WhackAMoleHTML
      moles={moles}
      score={score}
      timeLeft={timeLeft}
      gameOver={gameOver}
      handleHit={handleHit}
      restartGame={restartGame}
    />
  );
};

export default WhackAMole;
