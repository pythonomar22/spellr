import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reading.css';

const Reading = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecodableBooks = async () => {
      const response = await fetch('http://localhost:5000/decodable-books?words=pure,mature,ensure,procedure');
      const generatedBooks = await response.json();
      setBooks(generatedBooks);
      setLoading(false);
    };

    fetchDecodableBooks();
  }, []);

  const handleWordClick = (word) => {
    navigate(`/sentences/${word}`);
  };

  return (
    <div className="reading">
      <h1>Reading Page</h1>
      {loading ? (
        <div className="loading-spinner">
          <img src="spinny.gif" alt="Loading..." style={{ width: '50px', height: '50px' }} />
        </div>
      ) : (
        <div className="word-boxes">
          {books.map((book) => (
            <div
              key={book.word}
              className="word-box"
              onClick={() => handleWordClick(book.word)}
            >
              {book.word}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reading;
