import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Tracker from './Tracker';
import './App.css';
import WordWrapper from './WordWrapper';
import Checkin from './Checkin';
import Reading from './Reading';
import SentencePage from './SentencePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <Router>
      <div className="app">
        <header className="header">
          <nav>
            <Link to="/">
              <button className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')}>
                <WordWrapper word="Home">Home</WordWrapper>
              </button>
            </Link>
            <Link to="/tracker">
              <button className={currentPage === 'tracker' ? 'active' : ''} onClick={() => setCurrentPage('tracker')}>
                <WordWrapper word="Tracker">Tracker</WordWrapper>
              </button>
            </Link>
            <Link to="/checkin">
              <button className={currentPage === 'checkin' ? 'active' : ''} onClick={() => setCurrentPage('checkin')}>
                <WordWrapper word="Check-in">Check-in</WordWrapper>
              </button>
            </Link>
            <Link to="/reading">
              <button className={currentPage === 'reading' ? 'active' : ''} onClick={() => setCurrentPage('reading')}>
                <WordWrapper word="Reading">Reading</WordWrapper>
              </button>
            </Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/checkin" element={<Checkin />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/sentences/:word" element={<SentencePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;