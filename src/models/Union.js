const mongoose = require('mongoose');

const unionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contractAddress: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Union', unionSchema);