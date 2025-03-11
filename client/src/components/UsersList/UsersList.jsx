import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = ({ roomId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Function to fetching online users from the server
    const fetchUsers = async () => {

      try {
        const res = await axios.get(`http://localhost:5000/api/users/${roomId}`);
        setUsers(res.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
    // Updating the user list every 5 seconds
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, [roomId]);

  return (

    <div className="users-list">
      <h3>Online Users</h3>

      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (

        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
        
      ) : (
        <p>No users online.</p>
      )}
    </div>
  );
};

export default UsersList;
