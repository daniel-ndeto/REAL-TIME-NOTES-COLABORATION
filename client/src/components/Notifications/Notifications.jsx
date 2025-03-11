import React from 'react';
import './Notifications.css';

const Notifications = ({ notifications }) => {

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
