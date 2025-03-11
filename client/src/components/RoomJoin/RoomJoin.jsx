import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './RoomJoin.css';

const RoomJoin = () => {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();
  const { setUser, setRoom: setRoomContext } = useContext(UserContext);

  const handleJoin = (e) => {
    e.preventDefault();

    if (username && room) {
      setUser(username);
      setRoomContext(room);
      navigate(`/room/${room}`);
    }
  };

  return (
    <div className="room-join">
      <h2>Join a Room</h2>

      <form onSubmit={handleJoin}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default RoomJoin;
