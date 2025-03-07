import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TapRush.css";

const TapRush = () => {
  const gameAreaSize = 300;
  const targetSize = 40;
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0); // No localStorage now
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [canClick, setCanClick] = useState(true);
  const [difficulty, setDifficulty] = useState(2000);

  useEffect(() => {
    spawnTarget();
    const interval = setInterval(spawnTarget, difficulty);
    return () => clearInterval(interval);
  }, [difficulty]);

  const handleClick = () => {
    if (!canClick) return;
    setCanClick(false);

    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore > highestScore) {
        setHighestScore(newScore);
      }
      return newScore;
    });
  };

  const spawnTarget = () => {
    setCanClick(true);
    setTargetPosition({
      x: Math.random() * (gameAreaSize - targetSize),
      y: Math.random() * (gameAreaSize - targetSize),
    });
  };

  const resetGame = () => {
    setScore(0);
    setHighestScore(0); // Reset highest score
    spawnTarget();
  };
  const resetDifficulty = () => {
      setScore(0);
      spawnTarget();
    };

  return (
    <div className="game-container">
      <div className="game-box">
        <h1 className="animated-title">Tap Rush</h1>
        <div className="score-container">
          <p className="game-info">Score: {score}</p>
          <p className="high-score">🏆 Highest Score: {highestScore}</p>
        </div>
        <div className="game-area">
          <div
            className="target animated-target"
            style={{
              top: `${targetPosition.y}px`,
              left: `${targetPosition.x}px`,
            }}
            onClick={handleClick}
          ></div>
        </div>
        <div className="difficulty-buttons">
          <button
            className="difficulty-button easy"
            onClick={() => {
              setDifficulty(2000);
              resetDifficulty();
            }}
          >
            🟢 Chill Mode (2s)
          </button>
          <button
            className="difficulty-button challenging"
            onClick={() => {
              setDifficulty(1500);
              resetDifficulty();
            }}
          >
            🟠 Fast Reflexes (1.5s)
          </button>
          <button
            className="difficulty-button insane"
            onClick={() => {
              setDifficulty(1000);
              resetDifficulty();
            }}
          >
            🔴 Insane Speed (1s)
          </button>
        </div>
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate("/joy-junction")}>
          🔙 Back to Home
        </button>
      </div>
    </div>
  );
};

export default TapRush;
