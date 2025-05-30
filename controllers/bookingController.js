const pool = require('../utils/db');
const bookingModel = require('../models/bookingModel');
const trainModel = require('../models/trainModel');

const bookSeat = async (req, res) => {
  let client;

  try {
    const { trainId } = req.body;
    const userId = req.user.id;

    if (!trainId) return res.status(400).json({ message: 'trainId is required' });

    client = await pool.connect();
    await client.query('BEGIN');

    const train = await trainModel.findTrainById(trainId, client);
    if (!train) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Train not found' });
    }

//to prevent race conditions
const seatRows = await client.query(
    'SELECT * FROM bookings WHERE train_id = $1 FOR UPDATE',
    [trainId]
  );
  const bookedSeatsCount = seatRows.rowCount;
  

    if (bookedSeatsCount >= train.total_seats) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'No seats available' });
    }

    const seatNumber = bookedSeatsCount + 1;

    const booking = await bookingModel.createBooking(userId, trainId, seatNumber, client);

    await client.query('COMMIT');
    res.status(201).json({ message: 'Seat booked successfully', booking });

  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('Booking failed:', err.message);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  } finally {
    if (client) client.release();
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await bookingModel.getBookingById(bookingId, userId);
    if (!booking)
      return res.status(404).json({ message: 'Booking not found' });

    res.json(booking);
  } catch (err) {
    console.error('Error fetching booking:', err.message);
    res.status(500).json({ message: 'Failed to fetch booking', error: err.message });
  }
};

module.exports = {
  bookSeat,
  getBookingDetails,
};
