const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  room: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  lastEditedBy: { type: String, default: '' } // NEW
});

module.exports = mongoose.model('Note', NoteSchema);
