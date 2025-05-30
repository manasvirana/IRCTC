const db = require('../utils/db');

const createTrain = async (name, source, destination, totalSeats) => {
  const result = await db.query(
    'INSERT INTO trains (name, source, destination, total_seats) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, source, destination, totalSeats]
  );
  return result.rows[0];
};

const getTrainsBetween = async (source, destination) => {
    const result = await db.query(
      `SELECT t.*, 
        (t.total_seats - COALESCE(b.booked_seats, 0)) AS available_seats
      FROM trains t
      LEFT JOIN (
        SELECT train_id, COUNT(*) AS booked_seats
        FROM bookings
        GROUP BY train_id
      ) b ON t.id = b.train_id
      WHERE t.source ILIKE $1 AND t.destination ILIKE $2`,
      [source, destination]
    );
    return result.rows;
  };

  const findTrainById = async (trainId, client = db) => {
    const result = await client.query(
      'SELECT * FROM trains WHERE id = $1',
      [trainId]
    );
    return result.rows[0];
  };
  

module.exports = {
  createTrain,
  getTrainsBetween,
  findTrainById,
};
