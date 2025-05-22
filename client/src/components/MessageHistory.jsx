import React from 'react';

const MessageHistory = ({ messages }) => {
  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            textAlign: msg.user === 'human' ? 'right' : 'left',
            margin: '10px 0',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              backgroundColor: msg.user === 'human' ? '#DCF8C6' : '#ECECEC',
              padding: '8px 12px',
              borderRadius: '15px',
              maxWidth: '70%',
            }}
          >
            {msg.mode === 'voice' && <span role="img" aria-label="voice">🎤 </span>}
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageHistory;
