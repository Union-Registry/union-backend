const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const privadoController = require('../controllers/privadoController');
const unionController = require('../controllers/unionController');

// User routes
router.post('/', userController.createOrUpdateUser);

// Privado verification routes
router.post('/privado', privadoController.updatePrivadoStatus);
router.get('/privado/:walletAddress', privadoController.getPrivadoStatus);

// Union membership routes
router.post('/unions', unionController.addUserToUnion);
router.get('/unions/:walletAddress', unionController.getUserUnions);

module.exports = router;