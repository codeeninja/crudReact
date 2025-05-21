/**
 * Database Connection and Model Configuration
 * 
 * This file sets up the Sequelize connection to our MySQL database
 * and imports all models for use throughout the application.
 */

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance with database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'gym_management',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // Set to console.log to see SQL queries in console
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Initialize empty db object to hold models and sequelize instance
const db = {};

// Attach sequelize instances
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.members = require('./Member')(sequelize, DataTypes);

module.exports = db;
