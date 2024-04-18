import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';

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
      <h1>Trackers</h1>
      <h2>Words to practice:</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
      <h2>Phonetically similar words:</h2>
      <ul>
        {similarWords.map((word, index) => (
          <li key={index}>{word[0]} (Similarity: {word[1]})</li>
        ))}
      </ul>
    </div>
  );
};

export default Tracker;