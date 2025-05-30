const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateUser } = require('../middlewares/auth');

router.post('/', authenticateUser, bookingController.bookSeat);
router.get('/:id', authenticateUser, bookingController.getBookingDetails);

module.exports = router;
