const User = require('../models/User');

const updateOrCreateUser = async (req, res) => {
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
};

const getUserByWallet = async (req, res) => {
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
};

const getUsersByPartner = async (req, res) => {
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
};

module.exports = {
  updateOrCreateUser,
  getUserByWallet,
  getUsersByPartner
};