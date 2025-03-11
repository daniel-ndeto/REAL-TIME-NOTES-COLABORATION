// Controller for note-related REST endpoints

const Note = require('../models/Note');

// Create a new note
exports.createNote = async (req, res, next) => {
  try {
    const { title, content, room } = req.body;
    const note = new Note({ title, content, room });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Retrieve notes for a given room
exports.getNotesByRoom = async (req, res, next) => {
  try {
    const { room } = req.params;
    const notes = await Note.find({ room });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Update an existing note
exports.updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { content, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
