const addUserToUnion = async (req, res) => {
    try {
      const { walletAddress, unionContractAddress, status } = req.body;
  
      const user = await User.findOne({ walletAddress });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const union = await Union.findOne({ contractAddress: unionContractAddress });
      if (!union) {
        return res.status(404).json({ error: 'Union not found' });
      }
  
      const membership = await UnionMembership.findOneAndUpdate(
        { userId: user._id, unionId: union._id },
        { 
          status,
          joinDate: new Date()
        },
        { upsert: true, new: true }
      );
  
      res.json({ message: 'Union membership updated', membership });
    } catch (error) {
      console.error('Error processing union membership:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getUserUnions = async (req, res) => {
    try {
      const { walletAddress } = req.params;
  
      const user = await User.findOne({ walletAddress });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const memberships = await UnionMembership.find({ userId: user._id })
        .populate('unionId')
        .exec();
  
      res.json(memberships);
    } catch (error) {
      console.error('Error fetching user unions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };