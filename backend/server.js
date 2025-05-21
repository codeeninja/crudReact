/**
 * Main server file for the CRUD application
 * This file sets up our Express server, connects to MySQL using Sequelize,
 * applies middleware, and configures routes
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import database connection
const db = require('./models/index');

// Import routes
const memberRoutes = require('./routes/memberRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS is used to allow cross-origin requests from our React frontend
app.use(cors());
// Body parser middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Root route for API health check
app.get('/', (req, res) => {
  res.send('Gym Management API is running');
});

// Use member routes
// All member-related operations will be prefixed with /api/members
app.use('/api/members', memberRoutes);

// Sync database and start server
db.sequelize.sync()
  .then(() => {
    console.log('MySQL database connected successfully');
    // Start the server after successful database sync
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MySQL database connection error:', err);
  });
