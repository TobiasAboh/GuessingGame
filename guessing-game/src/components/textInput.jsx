import React, { useState } from 'react';

function TextInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  // Function to handle the send action
  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      onSendMessage(message);
      setMessage(''); // Clear the input after sending
    }
  };

  // Optional: handle form submit (for pressing Enter to send)
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ flex: 1, padding: '8px' }}
      />
      <button type="button" onClick={handleSend} style={{ padding: '8px 12px', marginLeft: '4px' }}>
        Send
      </button>
    </form>
  );
}

export default TextInput;
