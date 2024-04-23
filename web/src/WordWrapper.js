// WordWrapper.js

import React, { useState, useEffect } from 'react';

const WordWrapper = ({ word, children }) => {
  const [phonemicBreakdown, setPhonemicBreakdown] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchPhonemicBreakdown = async () => {
      if (isHovered) {
        try {
          const response = await fetch(`http://localhost:5000/phonemic-breakdown?word=${word}`);
          const data = await response.text();
          setPhonemicBreakdown(data);
        } catch (error) {
          console.error('Error fetching phonemic breakdown:', error);
        }
      } else {
        setPhonemicBreakdown('');
      }
    };

    fetchPhonemicBreakdown();
  }, [isHovered, word]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isHovered && phonemicBreakdown && (
        <span style={{ marginLeft: '5px', fontSize: '14px', color: 'lightgray' }}>
          ({phonemicBreakdown})
        </span>
      )}
    </span>
  );
};

export default WordWrapper;