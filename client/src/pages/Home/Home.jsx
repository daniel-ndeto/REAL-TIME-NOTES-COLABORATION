import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import './Home.css';

const Home = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // POST { username, password } to /api/auth/login
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      // The server should respond with a user object and a token
      const { user } = res.data;
      setUser(user); // Store the user in context
      setMessage('Login successful!');
      
      // Redirecting to room
      navigate('/room');
    } catch (error) {
      console.error(error);
      //  server returns 400 with "All fields are required."
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (

    <div className="home-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleLogin} className="home-form">
        
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="home-message">{message}</p>}

      <button className="link-button" onClick={goToRegister}>
        Don’t have an account? Register
      </button>
    </div>
  );
};

export default Home;
