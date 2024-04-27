// Tracker.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';
import WordWrapper from './WordWrapper';

const Tracker = () => {
  const [words, setWords] = useState([]);
  const [similarWords, setSimilarWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      const wordsRef = ref(database, '/');
      onValue(wordsRef, async (snapshot) => {
        const wordsData = snapshot.val();
        const wordsList = Object.entries(wordsData).map(([key, value]) => value);
        setWords(wordsList);

        try {
          const response = await fetch(`http://localhost:5000/similar-words?words=${wordsList.join(',')}`);
          const data = await response.json();
          setSimilarWords(data);
        } catch (error) {
          console.error('Error fetching similar words:', error);
        }
      });
    };

    fetchWords();
  }, []);

  return (
    <div style={{ backgroundColor: '#2c2c2c', minHeight: '100vh', padding: '20px', color: 'white' }}>
      <h1>
        <WordWrapper word="Trackers"></WordWrapper>
      </h1>
      <h2>
        <WordWrapper word="Words">Commonly</WordWrapper> <WordWrapper word="to">missed</WordWrapper> <WordWrapper word="practice">words</WordWrapper>:
      </h2>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li style={{ marginRight: '20px' }}>
          <WordWrapper word="pure">adventure</WordWrapper>
        </li>
        <li style={{ marginRight: '20px' }}>
          <WordWrapper word="mature">treasure</WordWrapper>
        </li>
        <li style={{ marginRight: '20px' }}>
          <WordWrapper word="ensure">closure</WordWrapper>
        </li>
        <li>
          <WordWrapper word="procedure">future</WordWrapper>
        </li>
      </ul>
      <h2>
        <WordWrapper word="Phonetically">Words</WordWrapper> <WordWrapper word="similar">to</WordWrapper> <WordWrapper word="words">practice</WordWrapper>:
      </h2>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li style={{ marginRight: '20px' }}>
          <WordWrapper word="pure">pure</WordWrapper>
        </li>
        <li style={{ marginRight: '20px' }}>
          <WordWrapper word="mature">mature</WordWrapper>
        </li>
        <li style={{ marginRight: '20px' }}>
          <WordWrapper word="ensure">ensure</WordWrapper>
        </li>
        <li>
          <WordWrapper word="procedure">procedure</WordWrapper>
        </li>
      </ul>
    </div>
  );
};

export default Tracker;