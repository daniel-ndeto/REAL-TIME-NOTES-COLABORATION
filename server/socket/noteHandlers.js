// Handles note-related socket events

const Note = require('../models/Note');

// When a client edits a note, update the DB and notify others
exports.handleEditNote = async (io, socket, data) => {
  const { noteId, content, room } = data;
  try {
    const note = await Note.findByIdAndUpdate(
      noteId,
      { content, updatedAt: Date.now() },
      { new: true }
    );
    // Broadcast the updated note to others in the same room
    socket.to(room).emit('noteUpdated', note);
  } catch (error) {
    console.error('Error updating note:', error);
  }
};
