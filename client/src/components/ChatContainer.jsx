import React, { useState, useEffect } from 'react';
import MessageHistory from './MessageHistory';
import TextInput from './TextInput';
import VoiceInput from './VoiceInput';
import ModeToggle from './ModeToggle';
import { sendMessage, checkServerHealth } from '../utils/api';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isServerHealthy, setIsServerHealthy] = useState(true);
  const userId = 1; // Placeholder user ID

  // Check server health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await checkServerHealth();
        setIsServerHealthy(true);
        setError(null);
      } catch (err) {
        console.error('Server health check failed:', err);
        setIsServerHealthy(false);
        setError('Unable to connect to the server. Please try again later.');
      }
    };
    checkHealth();
  }, []);

  const handleSend = async (content) => {
    if (!content.trim()) return;
    if (!isServerHealthy) {
      setError('Server is not available. Please try again later.');
      return;
    }

    // Add user message
    const userMessage = {
      user: 'human',
      content,
      mode: inputMode,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Call backend API
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await sendMessage({ input: content, userId, mode: inputMode });
      const aiMessage = {
        user: 'ai',
        content: data.response,
        mode: 'text',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Optional: Text-to-Speech for AI response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.response);
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to get response from AI');
      
      // Add error message to chat
      const errorMessage = {
        user: 'system',
        content: 'Sorry, I encountered an error. Please try again.',
        mode: 'text',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container max-w-2xl mx-auto p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}
      
      <MessageHistory messages={messages} />
      
      <div className="mt-4">
        <ModeToggle inputMode={inputMode} setInputMode={setInputMode} />
        
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-pulse">AI is thinking...</div>
          </div>
        ) : (
          inputMode === 'text' ? (
            <TextInput onSend={handleSend} disabled={!isServerHealthy} />
          ) : (
            <VoiceInput onSend={handleSend} disabled={!isServerHealthy} />
          )
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
