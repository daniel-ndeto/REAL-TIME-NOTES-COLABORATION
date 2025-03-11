// Handles room-related socket events (e.g., leaving a room)

exports.handleLeaveRoom = (io, socket, data) => {
    const { room, username } = data;
    socket.leave(room);
    console.log(`${username} left room ${room}`);
    io.to(room).emit('notification', `${username} has left the room.`);
  };
  