const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      mongodb: isMongoConnected ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;