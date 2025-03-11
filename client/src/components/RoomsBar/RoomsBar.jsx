import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import './RoomsBar.css';

const RoomsBar = () => {

  const { room, setRoom, user } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  // Fetching existing rooms
  useEffect(() => {

    const fetchRooms = async () => {

      try {
        const res = await axios.get('http://localhost:5000/api/rooms');
        setRooms(res.data); // array of rooms
      } catch (error) {

        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  // Selecting an existing room
  const handleSelectRoom = (e) => {
    setRoom(e.target.value);
  };

  // Create a new room
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    try {
      // sending createdBy: user.username or user._id
      const res = await axios.post('http://localhost:5000/api/rooms', {
        name: newRoomName,
        createdBy: user?.username || user
      });

      // Adding new room to local state
      setRooms((prev) => [res.data, ...prev]);
      setRoom(res.data.name); // auto-select new room
      setNewRoomName('');
    } catch (error) {

      console.error('Error creating room:', error);
    }
  };

  return (

    <div className="rooms-bar">
      <h4>Select a Room</h4>

      <select value={room || ''} onChange={handleSelectRoom}>
        <option value="">-- Choose a Room --</option>
        {rooms.map((r) => (

          <option key={r._id} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>

      <h4>Create a New Room</h4>

      <input
        type="text"
        placeholder="New room name"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
      />
      
      <button onClick={handleCreateRoom}>Create</button>
    </div>
  );
};

export default RoomsBar;
