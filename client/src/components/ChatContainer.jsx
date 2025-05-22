import React, { useState } from 'react';
import MessageHistory from './MessageHistory';
import TextInput from './TextInput';
import VoiceInput from './VoiceInput';
import ModeToggle from './ModeToggle';
import { sendMessage } from '../utils/api';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'
  const userId = 1; // Placeholder user ID

  const handleSend = async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      user: 'human',
      content,
      mode: inputMode,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Call backend API
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
    }
  };

  return (
    <div>
      <MessageHistory messages={messages} />
      <ModeToggle inputMode={inputMode} setInputMode={setInputMode} />
      {inputMode === 'text' ? (
        <TextInput onSend={handleSend} />
      ) : (
        <VoiceInput onSend={handleSend} />
      )}
    </div>
  );
};

export default ChatContainer;
