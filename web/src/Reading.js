// spellr/web/src/Reading.js
import React, { useState, useEffect } from 'react';

const Reading = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchDecodableBooks = async () => {
      const response = await fetch('http://localhost:5000/decodable-books?words=pure,mature,ensure,procedure');
      const generatedBooks = await response.json();
      setBooks(generatedBooks);
    };

    fetchDecodableBooks();
  }, []);

  return (
    <div className="reading">
      <h1>Reading Page</h1>
      {books.map((book, index) => (
        <div key={index}>
          <ul>
            {book.sentences.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Reading;