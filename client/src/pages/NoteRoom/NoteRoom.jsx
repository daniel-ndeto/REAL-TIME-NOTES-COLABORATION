import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';
import RoomsBar from '../../components/RoomsBar/RoomsBar';
import UsersList from '../../components/UsersList/UsersList';
import Notifications from '../../components/Notifications/Notifications';
import NotesList from '../../components/NotesList/NotesList';
import Editor from '../../components/Editor/Editor';
import './NoteRoom.css';

const NoteRoom = () => {
  const { user, room, setRoom, loading } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  // Local state for notifications, note content, online users, and new note title
  const [notifications, setNotifications] = useState([]);
  const [note, setNote] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  // Waiting until user is loaded before redirecting
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Setting a default room if none is selected yet
  useEffect(() => {
    if (!room) {
      setRoom('DefaultRoom');
    }
  }, [room, setRoom]);

  // Socket connection: joining room and listening for events.
  useEffect(() => {

    if (socket && user && room) {
      socket.emit('joinRoom', { username: user.username, room });

      socket.on('notification', (message) => {
        setNotifications((prev) => [...prev, message]);
      });

      socket.on('noteUpdated', (updatedNote) => {
        setNote(updatedNote);
      });

      socket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => {

        socket.off('notification');
        socket.off('noteUpdated');
        socket.off('onlineUsers');
      };
    }
  }, [socket, user, room]);

  // Fetching existing note for the room.
  useEffect(() => {
    const fetchNote = async () => {
      if (!room) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/${room}`);
        if (res.data && res.data.length > 0) {
          setNote(res.data[0]);
        } else {

          // No note exists—prompt creation by setting note to null.
          setNote(null);
        }
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };
    fetchNote();
  }, [room]);

  // Creating a new note with a custom title.
  const handleCreateNote = async () => {
    if (!newTitle.trim()) return;
    try {
      const newNote = {
        title: newTitle,
        content: '',
        room,
        lastEditedBy: user.username,
      };
      const createRes = await axios.post('http://localhost:5000/api/notes', newNote);
      setNote(createRes.data);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // If no room is selected, prompt the user.
  if (!room) {
    return (
      <div className="note-room">
        <div className="sidebar">
          <RoomsBar />
          <UsersList users={onlineUsers} />
          <Notifications notifications={notifications} />
        </div>
        <div className="main-content">
          <h2>Please select or create a room above.</h2>
        </div>
      </div>
    );
  }

  // If no note exists yet, prompt for a custom title.
  if (note === null) {
    return (
      <div className="note-room">
        <div className="sidebar">
          <RoomsBar />
          <UsersList users={onlineUsers} />
          <Notifications notifications={notifications} />
        </div>
        <div className="main-content">
          <h2>No note found for room: {room}</h2>
          <p>Enter a custom title to create a new note:</p>
          <input
            type="text"
            placeholder="Note title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleCreateNote}>Create Note</button>
        </div>
      </div>
    );
  }

  // Displaying the note, editor, and related components.
  return (
    <div className="note-room">
      <div className="sidebar">
        <RoomsBar />

        <UsersList users={onlineUsers} />
        <Notifications notifications={notifications} />
      </div>

      <div className="main-content">
        <h2>{note.title}</h2>
        <p>
          Last edited by: <strong>{note.lastEditedBy || user.username}</strong>
        </p>
        
        <NotesList note={note} />
        <Editor note={note} setNote={setNote} user={user.username} />
      </div>
    </div>
  );
};

export default NoteRoom;
