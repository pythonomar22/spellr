// spellr/web/src/SentencePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SentencePage.css';

const SentencePage = () => {
  const { word } = useParams();
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [mispronunciationResult, setMispronunciationResult] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentences = async () => {
      const response = await fetch(`http://localhost:5000/decodable-books?words=pure,mature,ensure,procedure`);
      const generatedBooks = await response.json();
      // Find the book object that matches the word clicked on the Reading page
      const bookObject = generatedBooks.find((book) => book.word === word);
      if (bookObject) {
        setSentences(bookObject.sentences);
      }
    };
    fetchSentences();
  }, [word]);

  const handleNextSentence = () => {
    setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousSentence = () => {
    setCurrentSentenceIndex((prevIndex) => prevIndex - 1);
  };

  const handleGoBack = () => {
    navigate('/reading');
  };

  const handleRecordAudio = async () => {
    setIsRecording(true);
    const currentSentence = sentences[currentSentenceIndex];
    console.log("Current sentence:", currentSentence);
  
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];
  
    // Start recording
    mediaRecorder.start();
  
    // Collect audio data
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
  
    // Stop recording after a specific duration (e.g., 5 seconds)
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
  
    // Wait for the recording to stop
    await new Promise((resolve) => {
      mediaRecorder.addEventListener("stop", resolve);
    });
  
    // Convert audio chunks to a Blob
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
  
    // Convert Blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    const base64Audio = await new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
    });
  
    // Send the audio data to the server
    const response = await fetch("http://localhost:5000/mispronunciation-detection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: currentSentence, audio: base64Audio }),
    });
  
    setIsRecording(false);
    setIsLoading(true);
    const data = await response.json();
    setMispronunciationResult(data.result);
    setIsLoading(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="sentence-page">
      <button className="back-button" onClick={handleGoBack}>
        &lt; Back
      </button>
      <div className="sentence">
        <p>{sentences[currentSentenceIndex]}</p>
      </div>
      {isRecording ? (
        <button className="stop-button" onClick={handleStopRecording}>
          Stop Recording
        </button>
      ) : (
        <button className="record-button" onClick={handleRecordAudio}>
          Record Audio
        </button>
      )}
      {isLoading && (
        <div className="loading-spinner">
          <img src="spinny.gif" alt="Loading..." style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      <div className="mispronunciation-result">
        <pre>{mispronunciationResult}</pre>
      </div>
      <div className="navigation">
        {currentSentenceIndex > 0 && (
          <button className="arrow-button" onClick={handlePreviousSentence}>
            &lt;
          </button>
        )}
        {currentSentenceIndex < sentences.length - 1 && (
          <button className="arrow-button" onClick={handleNextSentence}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default SentencePage;