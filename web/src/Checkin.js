import React from 'react';
import WordWrapper from './WordWrapper';

const Checkin = () => {
  return (
    <div>
      <h1>
        <WordWrapper word="Check-in">Check-in</WordWrapper>{' '}
        <WordWrapper word="Page">Page</WordWrapper>
      </h1>
      {/* Add your check-in page content here */}
    </div>
  );
};

export default Checkin;