import React, { useState } from 'react';
import Home from './Home';
import Game from './Game';
import './App.css';


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'game':
        return <Game />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <nav>
          <button
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button
            className={currentPage === 'game' ? 'active' : ''}
            onClick={() => setCurrentPage('game')}
          >
            Game
          </button>
        </nav>
      </header>
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;