// Express routes for user-related endpoints

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST: create or join a user
router.post('/', userController.createUser);

// GET: get users by room
router.get('/:room', userController.getUsersByRoom);

module.exports = router;
