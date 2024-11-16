require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/user-verification';

// Connection with retry logic
const connectWithRetry = async () => {
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

connectWithRetry();

// Updated User Schema
const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDate: {
    type: Date,
    default: null
  },
  // New fields
  partnerAddress: {
    type: String,
    default: null
  },
  unionContractAddress: {
    type: String,
    default: null
  },
  unionContractSigned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// Health Check Endpoint
app.get('/health', async (req, res) => {
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

// Updated Routes
app.post('/api/users/verification', async (req, res) => {
  try {
    const { 
      walletAddress, 
      isVerified,
      partnerAddress,
      unionContractAddress,
      unionContractSigned
    } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    let user = await User.findOne({ walletAddress });

    if (user) {
      // Update existing user
      user.isVerified = isVerified ?? user.isVerified;
      if (isVerified) {
        user.verificationDate = new Date();
      }
      user.partnerAddress = partnerAddress ?? user.partnerAddress;
      user.unionContractAddress = unionContractAddress ?? user.unionContractAddress;
      user.unionContractSigned = unionContractSigned ?? user.unionContractSigned;
      
      await user.save();
      res.json({ message: 'User verification updated', user });
    } else {
      // Create new user
      user = new User({
        walletAddress,
        isVerified,
        verificationDate: isVerified ? new Date() : null,
        partnerAddress,
        unionContractAddress,
        unionContractSigned
      });
      await user.save();
      res.status(201).json({ message: 'User created', user });
    }
  } catch (error) {
    console.error('Error processing verification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:walletAddress', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New endpoint to get users by partner address
app.get('/api/users/partner/:partnerAddress', async (req, res) => {
  try {
    const users = await User.findOne({ partnerAddress: req.params.partnerAddress });
    if (!users) {
      return res.status(404).json({ error: 'No users found for this partner address' });
    }
    res.json(users);
  } catch (error) {
    console.error('Error fetching users by partner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});