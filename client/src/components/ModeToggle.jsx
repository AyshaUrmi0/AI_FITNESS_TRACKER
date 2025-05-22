import React from 'react';

const ModeToggle = ({ inputMode, setInputMode }) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <label>
        <input
          type="radio"
          value="text"
          checked={inputMode === 'text'}
          onChange={() => setInputMode('text')}
        />
        Text
      </label>
      <label style={{ marginLeft: '15px' }}>
        <input
          type="radio"
          value="voice"
          checked={inputMode === 'voice'}
          onChange={() => setInputMode('voice')}
        />
        Voice
      </label>
    </div>
  );
};

export default ModeToggle;
