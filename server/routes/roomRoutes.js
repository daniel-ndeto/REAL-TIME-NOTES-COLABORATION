// server/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});

// POST create a new room
router.post('/', async (req, res) => {
  try {
    const { name, createdBy } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Room name is required' });
    }

    // Check if room already exists
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room already exists' });
    }

    const newRoom = new Room({ name, createdBy });
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating room' });
  }
});

module.exports = router;
