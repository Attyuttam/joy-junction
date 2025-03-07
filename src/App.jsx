import React, { useState, useEffect } from "react";

const TapRush = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetVisible, setTargetVisible] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const showTarget = setTimeout(() => {
        setTargetVisible(true);
        setTargetPosition({
          x: Math.random() * 40 + 30, // Ensuring it stays more centered
          y: Math.random() * 40 + 30,
        });
      }, Math.random() * 1500 + 800); // Make it easier by increasing appearance time

      const hideTarget = setTimeout(() => setTargetVisible(false), 1200); // Increase visibility duration
      return () => {
        clearTimeout(showTarget);
        clearTimeout(hideTarget);
      };
    }
  }, [timeLeft, score]);

  const handleTap = () => {
    if (targetVisible) {
      setScore(score + 1);
      setTargetVisible(false);
    }
  };

  return (
    <div className="game-container">
      <h1>Tap Rush</h1>
      <p>Time Left: {timeLeft}s</p>
      <p>Score: {score}</p>
      <div className="game-area" onClick={handleTap}>
        {targetVisible && (
          <div
            className="target"
            style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default TapRush;
