import { useEffect, useRef } from 'react';
import '../styles/MessageList.css';

export default function MessageList({ messages, currentUser }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list-container">
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>📝 No messages yet. Be the first to say something!</p>
        </div>
      ) : (
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === currentUser ? 'sent' : 'received'
              }`}
            >
              <div className="message-sender">
                {message.sender === currentUser ? 'You' : message.sender}
              </div>
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}