import React, { useState } from 'react';
import WordWrapper from './WordWrapper';
import './Checkin.css';

const Checkin = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, isUser: true }]);
      setInputMessage('');

      try {
        const response = await fetch('http://localhost:5000/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, isUser: false },
        ]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="checkin-container">
      <h1>
        <WordWrapper word="Welcome">Welcome</WordWrapper>{' '}
        <WordWrapper word="to">to</WordWrapper>{' '}
        <WordWrapper word="the">the</WordWrapper>{' '}
        <WordWrapper word="Chatbot">Chatbot</WordWrapper>
      </h1>
      <div className="chatbot-container">
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${
                message.isUser ? 'user-message' : 'bot-message'
              }`}
            >
              <WordWrapper word={message.text}>{message.text}</WordWrapper>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>
            <WordWrapper word="Send">Send</WordWrapper>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkin;