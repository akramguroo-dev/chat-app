const mongoose = require('mongoose');

// Define what a message looks like
const messageSchema = new mongoose.Schema({
  // Who sent the message?
  sender: {
    type: String,
    required: true,
    trim: true
  },

  // What room is it in?
  room: {
    type: String,
    required: true,
    trim: true
  },

  // The actual message text
  text: {
    type: String,
    required: true,
    trim: true
  },

  // When was it sent?
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
module.exports = mongoose.model('Message', messageSchema);