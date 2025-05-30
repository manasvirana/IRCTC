const db = require('../utils/db');

const getBookedSeatsCount = async (trainId, client = db) => {
  const result = await client.query(
    'SELECT COUNT(*) FROM bookings WHERE train_id = $1',
    [trainId]
  );
  return parseInt(result.rows[0].count, 10);
};

const createBooking = async (userId, trainId, seatNumber, client = db) => {
  const result = await client.query(
    'INSERT INTO bookings (user_id, train_id, seat_number) VALUES ($1, $2, $3) RETURNING *',
    [userId, trainId, seatNumber]
  );
  return result.rows[0];
};

const getBookingById = async (bookingId, userId) => {
  const result = await db.query(
    `SELECT b.*, t.name AS train_name, t.source, t.destination
     FROM bookings b
     JOIN trains t ON b.train_id = t.id
     WHERE b.id = $1 AND b.user_id = $2`,
    [bookingId, userId]
  );
  return result.rows[0];
};

module.exports = {
  getBookedSeatsCount,
  createBooking,
  getBookingById,
};
