const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/nuxtdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const DataSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  time: Date,
});

const Data = mongoose.model('Data', DataSchema);

// Add data
router.post('/add', async (req, res) => {
  const { symbol, price, time } = req.body;
  const newData = new Data({ symbol, price, time });
  await newData.save();
  res.json({ message: 'Data added successfully' });
});

// Delete data
router.delete('/delete/:id', async (req, res) => {
  await Data.findByIdAndDelete(req.params.id);
  res.json({ message: 'Data deleted successfully' });
});

// Get all data
router.get('/all', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

module.exports = router; 