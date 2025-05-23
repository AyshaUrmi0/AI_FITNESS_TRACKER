import React, { useState, useEffect, useRef } from 'react';

const VoiceInput = ({ onSend }) => {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackText, setFallbackText] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Voice recognition is not supported in your browser');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSend(transcript);
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(getErrorMessage(event.error));
        setListening(false);
        
        // Show fallback on certain errors
        if (['no-speech', 'audio-capture', 'network'].includes(event.error)) {
          setShowFallback(true);
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      setIsSupported(false);
      setError('Failed to initialize voice recognition');
    }
  }, [onSend]);

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'no-speech': 'No speech was detected. Please try again.',
      'aborted': 'Voice recognition was aborted.',
      'audio-capture': 'No microphone was found. Please ensure your microphone is connected.',
      'network': 'Network error occurred. Please check your connection.',
      'not-allowed': 'Microphone access was denied. Please allow microphone access.',
      'service-not-allowed': 'Voice recognition service is not allowed.',
      'bad-grammar': 'Voice recognition grammar error.',
      'language-not-supported': 'Language not supported.'
    };
    return errorMessages[errorCode] || 'An error occurred with voice recognition';
  };

  const toggleListening = () => {
    if (!isSupported) {
      setShowFallback(true);
      return;
    }

    try {
      if (listening) {
        recognitionRef.current.stop();
        setListening(false);
      } else {
        setError(null);
        recognitionRef.current.start();
        setListening(true);
      }
    } catch (err) {
      setError('Failed to start voice recognition');
      setShowFallback(true);
    }
  };

  const handleFallbackSubmit = (e) => {
    e.preventDefault();
    if (fallbackText.trim()) {
      onSend(fallbackText);
      setFallbackText('');
      setShowFallback(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="voice-input-fallback">
        <p className="text-red-500 mb-2">{error}</p>
        <form onSubmit={handleFallbackSubmit} className="flex gap-2">
          <input
            type="text"
            value={fallbackText}
            onChange={(e) => setFallbackText(e.target.value)}
            placeholder="Type your message instead..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="voice-input-container">
      {error && (
        <div className="mb-2 p-2 bg-red-100 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setShowFallback(true)}
            className="ml-2 text-sm underline"
          >
            Use text input instead
          </button>
        </div>
      )}
      
      {showFallback ? (
        <form onSubmit={handleFallbackSubmit} className="flex gap-2">
          <input
            type="text"
            value={fallbackText}
            onChange={(e) => setFallbackText(e.target.value)}
            placeholder="Type your message instead..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => setShowFallback(false)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Back to Voice
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`px-4 py-2 rounded-lg transition-all ${
              listening
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {listening ? (
              <>
                <span className="animate-pulse">●</span> Listening...
              </>
            ) : (
              'Start Voice Input 🎤'
            )}
          </button>
          <button
            onClick={() => setShowFallback(true)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Use Text Instead
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;