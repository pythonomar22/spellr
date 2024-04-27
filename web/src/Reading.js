// spellr/web/src/Reading.js
import React, { useState, useEffect } from 'react';
import './Reading.css';

const Reading = () => {
  const [books, setBooks] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    const fetchDecodableBooks = async () => {
      const response = await fetch('http://localhost:5000/decodable-books?words=pure,mature,ensure,procedure');
      const generatedBooks = await response.json();
      setBooks(generatedBooks);
    };

    fetchDecodableBooks();
  }, []);

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  return (
    <div className="reading">
      <h1>Reading Page</h1>
      <div className="word-boxes">
        {books.map((book, index) => (
          <div
            key={index}
            className={`word-box ${selectedWord === book.word ? 'selected' : ''}`}
            onClick={() => handleWordClick(book.word)}
          >
            {book.word.toUpperCase()}
          </div>
        ))}
      </div>
      {selectedWord && (
        <div className="sentences">
          {books
            .find((book) => book.word === selectedWord)
            .sentences.map((sentence, index) => (
              <p key={index}>{sentence}</p>
            ))}
        </div>
      )}
    </div>
  );
};

export default Reading;