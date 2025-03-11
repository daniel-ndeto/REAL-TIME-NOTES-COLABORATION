// server/models/Room.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdBy: { type: String, default: '' }, // optional: store username or userId
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', RoomSchema);
