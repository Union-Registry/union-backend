const updatePrivadoStatus = async (req, res) => {
    try {
      const { walletAddress, isVerified, verificationStatus, verificationDetails } = req.body;
  
      const user = await User.findOne({ walletAddress });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const verification = await PrivadoVerification.findOneAndUpdate(
        { userId: user._id },
        {
          isVerified,
          verificationStatus,
          verificationDetails,
          verificationDate: isVerified ? new Date() : null,
          lastChecked: new Date()
        },
        { upsert: true, new: true }
      );
  
      res.json({ message: 'Privado verification updated', verification });
    } catch (error) {
      console.error('Error updating Privado status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getPrivadoStatus = async (req, res) => {
    try {
      const { walletAddress } = req.params;
      
      const user = await User.findOne({ walletAddress });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const verification = await PrivadoVerification.findOne({ userId: user._id });
      if (!verification) {
        return res.status(404).json({ error: 'No verification record found' });
      }
  
      res.json(verification);
    } catch (error) {
      console.error('Error fetching Privado status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };