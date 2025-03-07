import React, { useState, useEffect } from "react";
import "./App.css"; // Importing the CSS file for styling

const TapRush = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetVisible, setTargetVisible] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [difficulty, setDifficulty] = useState("Easy");
  const [targetDisplayTime, setTargetDisplayTime] = useState(3000);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const showTarget = setTimeout(() => {
        setTargetPosition({
          x: Math.random() * 80 + 10, // Spread position more evenly
          y: Math.random() * 80 + 10,
        });
        setTargetVisible(true);
      }, Math.random() * 1000 + 500); // Appear faster

      const hideTarget = setTimeout(() => setTargetVisible(false), targetDisplayTime); // Adjust visibility time based on difficulty
      return () => {
        clearTimeout(showTarget);
        clearTimeout(hideTarget);
      };
    }
  }, [timeLeft, score, targetDisplayTime]);

  const handleTap = () => {
    if (targetVisible) {
      setScore(score + 1);
      setTargetVisible(false);
    }
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    if (level === "Easy") {
      setTargetDisplayTime(3000);
    } else if (level === "Challenging") {
      setTargetDisplayTime(2000);
    } else if (level === "Insane Mode") {
      setTargetDisplayTime(1000);
    }
    // Reset the game when difficulty is changed
    setScore(0);
    setTimeLeft(30);
    setTargetVisible(false);
  };

  return (
    <div className="game-container">
      <div className="game-box">
        <h1 className="game-title animated-title">Tap Rush</h1>
        <p className="game-info">Time Left: {timeLeft}s</p>
        <p className="game-info">Score: {score}</p>
        <div className="difficulty-buttons">
          <button className="difficulty-button easy" onClick={() => handleDifficultyChange("Easy")}>
            Easy
          </button>
          <button className="difficulty-button challenging" onClick={() => handleDifficultyChange("Challenging")}>
            Challenging
          </button>
          <button className="difficulty-button insane" onClick={() => handleDifficultyChange("Insane Mode")}>
            Insane Mode
          </button>
        </div>
        <p className="game-info">Current Difficulty: {difficulty}</p>
        <div className="game-area" onClick={handleTap}>
          {targetVisible && (
            <div
              className="target animated-target"
              style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TapRush;