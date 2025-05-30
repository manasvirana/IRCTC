const trainModel = require('../models/trainModel');

const addTrain = async (req, res) => {
  try {
    const { name, source, destination, totalSeats } = req.body;

    if (!name || !source || !destination || !totalSeats) {
      return res.status(400).json({ message: 'Please fill all train details' });
    }

    const train = await trainModel.createTrain(name, source, destination, totalSeats);
    res.status(201).json({ message: 'Train added successfully', train });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getSeatAvailability = async (req, res) => {
    try {
      let { source, destination } = req.query;
  
      if (!source || !destination)
        return res.status(400).json({ message: 'Source and destination required' });
  
      source = source.trim();
      destination = destination.trim();
  
      const trains = await trainModel.getTrainsBetween(source, destination);
  
      res.json(trains);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  

module.exports = {
  addTrain,
  getSeatAvailability,
};
