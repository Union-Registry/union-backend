const User = require('../models/User');
const PrivadoVerification = require('../models/PrivadoVerification');
const UnionMembership = require('../models/UnionMembership');
const Union = require('../models/Union');

const createOrUpdateUser = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    let user = await User.findOneAndUpdate(
      { walletAddress },
      { walletAddress },
      { upsert: true, new: true }
    );

    res.json({ message: 'User processed successfully', user });
  } catch (error) {
    console.error('Error processing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};