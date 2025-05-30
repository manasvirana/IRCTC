require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(cors());
app.use(express.json());          
app.use(express.urlencoded({ extended: true }));  // postman error fixed

app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send('IRCTC API is running!');
  });
  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`IRCTC API running on port ${PORT}`);
});
