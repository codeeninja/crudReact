-- MySQL Database Schema for Gym Management System

-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS gym_management;

-- Use the database
USE gym_management;

-- Drop existing tables if they exist (for clean reset)
DROP TABLE IF EXISTS members;

-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  membershipType ENUM('Basic', 'Standard', 'Premium') NOT NULL DEFAULT 'Basic',
  joiningDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO members (name, email, phone, membershipType, active) VALUES 
  ('John Smith', 'john@example.com', '555-123-4567', 'Premium', true),
  ('Jane Doe', 'jane@example.com', '555-987-6543', 'Standard', true),
  ('Mike Johnson', 'mike@example.com', '555-456-7890', 'Basic', true),
  ('Sarah Williams', 'sarah@example.com', '555-789-0123', 'Premium', true),
  ('Robert Brown', 'robert@example.com', '555-321-6540', 'Standard', false);
