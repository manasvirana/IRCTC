const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', authenticateUser, authorizeAdmin, userController.getAllUsers);
  
module.exports = router;
