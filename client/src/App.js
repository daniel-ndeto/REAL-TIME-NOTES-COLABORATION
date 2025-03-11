import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NoteRoom from './pages/NoteRoom/NoteRoom';
import Register from './pages/Register/Register';
import Header from './components/Header'; 
import { NoteProvider } from './context/NoteContext';
import { SocketProvider } from './context/SocketContext';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <Router>
      <SocketProvider>
        <UserProvider>
          <NoteProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/room/:roomId" element={<NoteRoom />} />
              <Route path="/room" element={<NoteRoom />} />
            </Routes>
          </NoteProvider>
        </UserProvider>
      </SocketProvider>
    </Router>
  );
}

export default App;
