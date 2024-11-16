// src/config/database.js
const mongoose = require('mongoose');

const connectWithRetry = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/user-verification';
  
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

module.exports = { connectWithRetry };