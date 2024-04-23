import React, { useState } from 'react';
import Home from './Home';
import Tracker from './Tracker';
import './App.css';
import WordWrapper from './WordWrapper';
import Checkin from './Checkin';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'tracker':
        return <Tracker />;
      case 'checkin':
        return <Checkin />;
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
            <WordWrapper word="Home">Home</WordWrapper>
          </button>
          <button
            className={currentPage === 'tracker' ? 'active' : ''}
            onClick={() => setCurrentPage('tracker')}
          >
            <WordWrapper word="Tracker">Tracker</WordWrapper>
          </button>
          <button
            className={currentPage === 'checkin' ? 'active' : ''}
            onClick={() => setCurrentPage('checkin')}
          >
            <WordWrapper word="Check-in">Check-in</WordWrapper>
          </button>
        </nav>
      </header>
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;