// Express routes for note-related endpoints

const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// POST: create a new note
router.post('/', noteController.createNote);

// GET: retrieve notes by room
router.get('/:room', noteController.getNotesByRoom);

// PUT: update a note by its id
router.put('/:id', noteController.updateNote);

module.exports = router;
