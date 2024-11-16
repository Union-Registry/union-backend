const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/verification', userController.updateOrCreateUser);
router.get('/:walletAddress', userController.getUserByWallet);
router.get('/partner/:partnerAddress', userController.getUsersByPartner);

module.exports = router;