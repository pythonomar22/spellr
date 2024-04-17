import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';

const Game = () => {
  const [words, setWords] = useState([]);


  useEffect(() => {
    // Fetch the words from Firebase
    const wordsRef = ref(database, '/');
    onValue(wordsRef, (snapshot) => {
      const wordsData = snapshot.val();
      const wordsList = Object.entries(wordsData).map(([key, value]) => value);
      setWords(wordsList);
      
      // Log the words to the console
      console.log('Words from Firebase:', wordsList);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#2c2c2c', minHeight: '100vh', padding: '20px', color: 'white' }}>
      <h1>Games</h1>
      <h2>Words to practice:</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default Game;