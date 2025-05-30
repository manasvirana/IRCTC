const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { authenticateUser } = require('../middlewares/auth');
const adminApiKey = require('../middlewares/adminMiddleware');

router.post('/', adminApiKey, authenticateUser, trainController.addTrain);
router.get('/availability', authenticateUser, trainController.getSeatAvailability);

module.exports = router;
