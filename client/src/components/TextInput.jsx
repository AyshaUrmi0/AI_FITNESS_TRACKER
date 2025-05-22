import React, { useState } from 'react';

const TextInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 12px' }}>
        Send
      </button>
    </form>
  );
};

export default TextInput;
