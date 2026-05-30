import { useState } from 'react';
import '../styles/ChatBox.css';

export default function ChatBox({ onSendMessage, currentUser }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;

    // Call parent function with message
    onSendMessage({
      sender: currentUser,
      text: message,
      timestamp: new Date()
    });

    // Clear input
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbox-container">
      <textarea
        className="message-input"
        placeholder="Type a message... (Press Enter to send, Shift+Enter for new line)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        rows={3}
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        📤 Send
      </button>
    </div>
  );
}