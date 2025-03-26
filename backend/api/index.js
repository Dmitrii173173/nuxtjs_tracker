const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Получение порта и URI MongoDB из переменных окружения
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/nuxtdb';

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Define schema
const DataSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  time: Date,
});

const Data = mongoose.model('Data', DataSchema);

// Add data
app.post('/api/add', async (req, res) => {
  try {
    const { symbol, price, time } = req.body;
    const newData = new Data({ symbol, price, time: time || new Date() });
    await newData.save();
    res.json({ message: 'Data added successfully', data: newData });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data', error: error.message });
  }
});

// Delete data
app.delete('/api/delete/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
});

// Get all data
app.get('/api/all', async (req, res) => {
  try {
    const data = await Data.find().sort({ time: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 