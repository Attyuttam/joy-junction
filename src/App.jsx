import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TapRush from "./games/TapRush";
import "./App.css"; // Importing the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Joy Junction</h1>
      <p className="home-subtitle">Choose a game to play:</p>
      <div className="game-list">
        <Link to="/tap-rush" className="game-link">Tap Rush</Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joy-junction" element={<Home />} />
          <Route path="/tap-rush" element={<TapRush />} />
      </Routes>
    </Router>
  );
};

export default App;