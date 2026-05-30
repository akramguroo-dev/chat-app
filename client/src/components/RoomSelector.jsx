import { useState } from 'react';
import '../styles/RoomSelector.css';

export default function RoomSelector({ onJoinRoom }) {
  const [userName, setUserName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('general');
  const [error, setError] = useState('');

  const rooms = ['general', 'tech', 'random'];

  const handleJoin = () => {
    // Validation
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!selectedRoom) {
      setError('Please select a room');
      return;
    }

    // Call parent function to join room
    onJoinRoom(userName, selectedRoom);
    setError('');
  };

  return (
    <div className="room-selector-container">
      <div className="room-selector-card">
        <h1>💬 Chat App</h1>
        <p className="subtitle">Join a room and start chatting!</p>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="userName">Your Name</label>
          <input
            id="userName"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="room">Select Room</label>
          <select
            id="room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room.charAt(0).toUpperCase() + room.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button className="join-button" onClick={handleJoin}>
          Join Room
        </button>
      </div>
    </div>
  );
}