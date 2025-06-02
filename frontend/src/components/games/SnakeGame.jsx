import React, { useState, useEffect, useRef } from 'react';
import '../styles/games/SnakeGame.css';
import axios from 'axios';

/**
 * SnakeGameHTML: Vista de la serpiente en tablero.
 */
const SnakeGameHTML = ({
  boardSize,
  snake,
  food,
  foodImage,
  gameOver,
  restartGame,
  showStart,
  onStart,
  score
}) => {
  return (
    <div className="snake-game-container">
      <h1 className="snake-title">Snake Game</h1>
      <div className="snake-header-row">
        <div className="snake-score">
          Marcador: {score}
        </div>
        <section className="snake-controls">
          <h2>Controles</h2>
          <ul>
            <li>Flecha ↑ : Mover arriba</li>
            <li>Flecha ↓ : Mover abajo</li>
            <li>Flecha ← : Mover izquierda</li>
            <li>Flecha → : Mover derecha</li>
          </ul>
        </section>
      </div>
      {/* Solo mostrar popup de inicio si no hay game over */}
      {showStart && !gameOver && (
        <div
          className="snake-popup-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            className="snake-popup-content"
            style={{
              background: '#fff',
              padding: '2rem 3rem',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              textAlign: 'center',
              zIndex: 1000
            }}
          >
            <h2>Snake Game</h2>
            <button
              onClick={onStart}
              style={{
                marginTop: '1rem',
                padding: '0.7rem 2.5rem',
                background: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              Start game
            </button>
          </div>
        </div>
      )}
      {gameOver && (
        <div className="game-over">
          Game Over! <button onClick={restartGame}>Play Again</button>
        </div>
      )}
      <div
        className="snake-board"
        style={{
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          '--board-size': boardSize
        }}
      >
        {Array.from({ length: boardSize }).map((_, row) =>
          Array.from({ length: boardSize }).map((_, col) => {
            const head = snake[snake.length - 1];
            const tail = snake[0];
            const isHead = head[0] === col && head[1] === row;
            const isTail = tail[0] === col && tail[1] === row;
            const isSnake = snake.some(
              segment => segment[0] === col && segment[1] === row
            );
            const isBody = isSnake && !isHead && !isTail;
            const isFood = food[0] === col && food[1] === row;
            return (
              <div
                key={`${row}-${col}`}
                className={
                  isHead
                    ? 'cell snake-head'
                    : isTail
                    ? 'cell snake-tail'
                    : isBody
                    ? 'cell snake-body'
                    : 'cell'
                }
              >
                {isFood && (
                  <img
                    src={foodImage}
                    alt="food"
                    className="food-image"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
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

/**
 * SnakeGame: Lógica principal de Snake.
 *
 * Props esperadas:
 *   - perfilId: id de PerfilInfantil para enviar progreso.
 *   - juegoId: id de Juego correspondiente.
 */
const SnakeGame = ({ perfilId, juegoId }) => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [foodImage, setFoodImage] = useState('/img/games/fruta_manzana.png');
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [score, setScore] = useState(0);
  const [pendingDirection, setPendingDirection] = useState(null);
  const [hasMoved, setHasMoved] = useState(true);
  const boardSize = 20;
  const intervalRef = useRef(null);

  // Sonidos
  const comerAudioRef = useRef(null);
  const gameOverAudioRef = useRef(null);

  // Para medir tiempo
  const startTimeRef = useRef(null);
  const hasSentProgressRef = useRef(false);

  // Manejo de evento keydown e intervalo de movimiento
  useEffect(() => {
    if (showStart || gameOver) return;

    const handleKeyDown = e => {
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        e.preventDefault();
      }
      handleKeyPress(e);
    };

    document.addEventListener('keydown', handleKeyDown);
    intervalRef.current = setInterval(moveSnake, 200);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [snake, direction, showStart, gameOver, hasMoved, pendingDirection]);

  // Iniciar partida: registra startTime
  const handleStart = () => {
    setShowStart(false);
    setSnake([[5, 5]]);
    const firstFood = getRandomFood([[5, 5]]);
    setFood(firstFood);
    setFoodImage('/img/games/fruta_manzana.png');
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    hasSentProgressRef.current = false;
    startTimeRef.current = Date.now();
  };

  // Genera posición aleatoria para la fruta
  const getRandomFood = currentSnake => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize)
      ];
    } while (
      currentSnake.some(
        seg => seg[0] === newFood[0] && seg[1] === newFood[1]
      )
    );
    return newFood;
  };

  // Mover serpiente cada "tick"
  const moveSnake = () => {
    if (gameOver || showStart) return;

    let nextDirection = direction;
    if (pendingDirection) {
      if (
        !(
          (direction === 'UP' && pendingDirection === 'DOWN') ||
          (direction === 'DOWN' && pendingDirection === 'UP') ||
          (direction === 'LEFT' && pendingDirection === 'RIGHT') ||
          (direction === 'RIGHT' && pendingDirection === 'LEFT')
        )
      ) {
        nextDirection = pendingDirection;
        setDirection(pendingDirection);
      }
      setPendingDirection(null);
    }

    setHasMoved(true);

    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length - 1]];

    switch (nextDirection) {
      case 'UP':
        head[1] -= 1;
        break;
      case 'DOWN':
        head[1] += 1;
        break;
      case 'LEFT':
        head[0] -= 1;
        break;
      case 'RIGHT':
        head[0] += 1;
        break;
      default:
        break;
    }

    // Verificar colisión
    if (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= boardSize ||
      head[1] >= boardSize ||
      newSnake.some(seg => seg[0] === head[0] && seg[1] === head[1])
    ) {
      setGameOver(true);
      clearInterval(intervalRef.current);
      if (gameOverAudioRef.current) {
        gameOverAudioRef.current.currentTime = 0;
        gameOverAudioRef.current.play();
      }
      return;
    }

    newSnake.push(head);

    // Si come fruta
    if (head[0] === food[0] && head[1] === food[1]) {
      const nextFood = getRandomFood(newSnake);
      setFood(nextFood);
      setScore(prev => prev + 50);
      if (comerAudioRef.current) {
        comerAudioRef.current.currentTime = 0;
        comerAudioRef.current.play();
      }
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  // Detecta "Game Over" para enviar progreso
  useEffect(() => {
    if (gameOver) {
      // Sólo enviamos una vez
      if (!hasSentProgressRef.current) {
        hasSentProgressRef.current = true;
        const tiempoMs = Date.now() - startTimeRef.current;
        const tiempoSegs = Math.floor(tiempoMs / 1000);

        const stats = {
          score: score,
          time_seconds: tiempoSegs
        };

        axios
          .post('/api/progreso/juegos/', {
            perfil_infantil: perfilId,
            juego: juegoId,
            tiempo_jugado: tiempoSegs,
            estadisticas: stats
          })
          .catch(err => console.error('Error enviando progreso SnakeGame:', err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  // Manejo de teclas
  const handleKeyPress = e => {
    const keyToDir = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT'
    };
    const newDir = keyToDir[e.key];
    if (!newDir) return;

    if (
      (direction === 'UP' && newDir === 'DOWN') ||
      (direction === 'DOWN' && newDir === 'UP') ||
      (direction === 'LEFT' && newDir === 'RIGHT') ||
      (direction === 'RIGHT' && newDir === 'LEFT')
    ) {
      return;
    }

    if (hasMoved) {
      setDirection(newDir);
      setHasMoved(false);
      setPendingDirection(null);
    } else {
      setPendingDirection(prev => prev || newDir);
    }
  };

  // Limpiar intervalo al desmontar
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const restartGame = () => {
    clearInterval(intervalRef.current);
    setSnake([[5, 5]]);
    const firstFood = getRandomFood([[5, 5]]);
    setFood(firstFood);
    setFoodImage('/img/games/fruta_manzana.png');
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    hasSentProgressRef.current = false;
    startTimeRef.current = null;
    setShowStart(true);
  };

  return (
    <>
      <audio ref={comerAudioRef} src="/sounds/comer.mp3" preload="auto" />
      <audio ref={gameOverAudioRef} src="/sounds/game_over.mp3" preload="auto" />
      <SnakeGameHTML
        boardSize={boardSize}
        snake={snake}
        food={food}
        foodImage={foodImage}
        gameOver={gameOver}
        restartGame={restartGame}
        showStart={showStart}
        onStart={handleStart}
        score={score}
      />
    </>
  );
};

export default SnakeGame;