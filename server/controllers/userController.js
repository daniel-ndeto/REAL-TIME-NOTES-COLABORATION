// Controller for user-related REST endpoints

const User = require('../models/User');

// Create or retrieve a user when joining a room
exports.createUser = async (req, res, next) => {
  try {
    const { username, room } = req.body;
    let user = await User.findOne({ username, room });
    if (!user) {
      user = new User({ username, room });
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Get list of online users in a room
exports.getUsersByRoom = async (req, res, next) => {
  try {
    const { room } = req.params;
    const users = await User.find({ room, connected: true });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
