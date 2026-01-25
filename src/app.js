require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./dbConfig');
const { connectRedis } = require('./redisConfig');
const noteRoutes = require('./noteRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.INGRESS,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Database & Server Initialization
const startServer = async () => {
  await connectDB();
  await connectRedis();

  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`🚀 Notes Service running on port ${PORT}`));
};

startServer();