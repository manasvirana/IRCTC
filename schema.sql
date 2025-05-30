CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);


CREATE TABLE trains (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  source VARCHAR(255),
  destination VARCHAR(255),
  total_seats INTEGER NOT NULL
);


CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  train_id INTEGER REFERENCES trains(id),
  seat_number INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
