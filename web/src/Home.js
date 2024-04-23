import React from 'react';
import './Home.css';
import './App.css';
import WordWrapper from './WordWrapper';

const Home = () => {
  return (
    <div className="home">
      <h1>
        <WordWrapper word="Welcome">Welcome</WordWrapper>,{' '}
        <WordWrapper word="Omar">Omar</WordWrapper>
      </h1>
    </div>
  );
};

export default Home;