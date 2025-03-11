// Handles user-related socket events

const User = require('../models/User');

// When a user joins, update connection status and broadcast the new user list
exports.userJoin = async (io, socket, data) => {
  const { username, room } = data;
  try {
    let user = await User.findOne({ username, room });
    if (!user) {
      user = new User({ username, room });
    }
    user.connected = true;
    await user.save();
    const users = await User.find({ room, connected: true });
    io.to(room).emit('usersList', users);
  } catch (error) {
    console.error('Error in user join:', error);
  }
};

// Handle user disconnect events
exports.userDisconnect = async (io, socket) => {
  try {
    // In a real app, you would update the specific user status based on socket info.
    io.emit('notification', `A user has disconnected.`);
  } catch (error) {
    console.error('Error handling disconnect:', error);
  }
};
