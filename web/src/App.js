import React, { useState } from 'react';
import Home from './Home';
import Tracker from './Tracker';
import './App.css';


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'Tracker':
        return <Tracker />;
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
            className={currentPage === 'Tracker' ? 'active' : ''}
            onClick={() => setCurrentPage('Tracker')}
          >
            Tracker
          </button>
        </nav>
      </header>
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;