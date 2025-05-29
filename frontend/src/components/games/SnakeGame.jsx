import React, { useState, useEffect, useRef } from 'react';
import '../styles/games/SnakeGame.css';

const SnakeGameHTML = ({ boardSize, snake, food, foodImage, gameOver, restartGame }) => {
  return (
    <div className="snake-game-container">
      <h1 className="snake-title">Snake Game</h1>
      {gameOver && <div className="game-over">Game Over! <button onClick={restartGame}>Play Again</button></div>}
      <div className="snake-board" style={{ gridTemplateRows: `repeat(${boardSize}, 1fr)`, gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
        {Array.from({ length: boardSize }).map((_, row) =>
          Array.from({ length: boardSize }).map((_, col) => {
            const isSnake = snake.some(segment => segment[0] === col && segment[1] === row);
            const isFood = food[0] === col && food[1] === row;
            return (
              <div key={`${row}-${col}`} className={`cell ${isSnake ? 'snake' : ''}`}>
                {isFood && <img src={foodImage} alt="food" className="food-image" />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [foodImage, setFoodImage] = useState('/img/games/apple.png'); // Imagen inicial de la comida
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const boardSize = 20;
  const intervalRef = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    intervalRef.current = setInterval(moveSnake, 200);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(intervalRef.current);
    };
  }, [snake, direction]);

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length - 1]];

    switch (direction) {
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

    // Check for collisions
    if (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= boardSize ||
      head[1] >= boardSize ||
      newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])
    ) {
      setGameOver(true);
      clearInterval(intervalRef.current);
      return;
    }

    newSnake.push(head);

    // Check if food is eaten
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood([Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]);
      setFoodImage(`/img/games/food_${Math.floor(Math.random() * 5) + 1}.png`); // Cambia la imagen de la comida
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  const restartGame = () => {
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setFoodImage('/img/games/apple.png'); // Reinicia la imagen de la comida
    setDirection('RIGHT');
    setGameOver(false);
    intervalRef.current = setInterval(moveSnake, 200);
  };

  return (
    <SnakeGameHTML
      boardSize={boardSize}
      snake={snake}
      food={food}
      foodImage={foodImage}
      gameOver={gameOver}
      restartGame={restartGame}
    />
  );
};

export default SnakeGame;
