import React, { useState, useEffect } from 'react';
import './App.css';

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 100;

function getRandomCell() {
  const row = Math.floor(Math.random() * ROWS);
  const col = Math.floor(Math.random() * COLS);
  return [row, col];
}

function App() {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState(getRandomCell());
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      moveSnake();
    }, GAME_SPEED);
    return () => clearInterval(timerId);
  }, [snake]);

  function moveSnake() {
    const [headRow, headCol] = snake[0];
    let newHead;
    switch (direction) {
      case 'UP':
        newHead = [headRow - 1, headCol];
        break;
      case 'DOWN':
        newHead = [headRow + 1, headCol];
        break;
      case 'LEFT':
        newHead = [headRow, headCol - 1];
        break;
      case 'RIGHT':
        newHead = [headRow, headCol + 1];
        break;
      default:
        newHead = [headRow, headCol];
    }
    if (newHead[0] < 0 || newHead[0] >= ROWS || newHead[1] < 0 || newHead[1] >= COLS) {
      setGameOver(true);
      return;
    }
    if (snake.some(([row, col]) => row === newHead[0] && col === newHead[1])) {
      setGameOver(true);
      return;
    }
    const newSnake = [newHead, ...snake.slice(0, -1)];
    setSnake(newSnake);
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(getRandomCell());
      setScore(score => score + 10);
      setSnake([...newSnake, snake[snake.length - 1]]);
    }
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        setDirection('UP');
        break;
      case 'ArrowDown':
        setDirection('DOWN');
        break;
      case 'ArrowLeft':
        setDirection('LEFT');
        break;
      case 'ArrowRight':
        setDirection('RIGHT');
        break;
      default:
    }
  }

  function handleReset() {
    setSnake([[10, 10]]);
    setFood(getRandomCell());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
  }

  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyDown} onFocus={() => {}}>
      <div className="game-board" style={{ width: COLS * CELL_SIZE, height: ROWS * CELL_SIZE }}>
        {snake.map(([row, col], i) => (
          <div key={i} className="snake" style={{ top: row * CELL_SIZE, left: col * CELL_SIZE }} />
        ))}
        <div className="food" style={{ top: food[0] * CELL_SIZE, left: food[1] * CELL_SIZE }} />
      </div>
      <div className="score">Score: {score}</div>
      {gameOver && <div className="game-over">Game Over!</div>}
      <button className="reset-button" onClick={handleReset}>Reset</button>
    </div>
  );
  
}

export default App;