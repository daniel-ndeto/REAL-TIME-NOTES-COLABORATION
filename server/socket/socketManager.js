// server/socket/socketManager.js
const users = {};

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', ({ username, room }) => {
      socket.join(room);
      users[socket.id] = { username, room };

      // Emit updated user list
      updateOnlineUsers(io, room);

      // Notification
      io.to(room).emit('notification', `${username} has joined the room.`);
    });

    socket.on('disconnect', () => {
      const user = users[socket.id];
      if (user) {
        const { room, username } = user;
        delete users[socket.id];

        updateOnlineUsers(io, room);
        io.to(room).emit('notification', `${username} has left the room.`);
      }
    });
  });
};

// Helper function to broadcast the updated user list
function updateOnlineUsers(io, room) {
  const roomUsers = Object.values(users).filter((u) => u.room === room);
  const usernames = roomUsers.map((u) => u.username);
  io.to(room).emit('onlineUsers', usernames);
}

module.exports = { initSocket };
