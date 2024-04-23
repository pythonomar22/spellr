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
        <WordWrapper word="Trackers">Trackers</WordWrapper>
      </h1>
      <h2>
        <WordWrapper word="Words">Words</WordWrapper> <WordWrapper word="to">to</WordWrapper> <WordWrapper word="practice">practice</WordWrapper>:
      </h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>
            <WordWrapper word={word}>{word}</WordWrapper>
          </li>
        ))}
      </ul>
      <h2>
        <WordWrapper word="Phonetically">Phonetically</WordWrapper> <WordWrapper word="similar">similar</WordWrapper> <WordWrapper word="words">words</WordWrapper>:
      </h2>
      <ul>
        {similarWords.map((word, index) => (
          <li key={index}>
            <WordWrapper word={word[0]}>
              {word[0]} (<WordWrapper word="Similarity">Similarity</WordWrapper>: {word[1]})
            </WordWrapper>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracker;