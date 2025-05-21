# Gym Management System - CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application for managing gym members, built with React.js frontend and Node.js/Express/MySQL backend.

## Project Overview

This application allows gym administrators to:

- Create new member records
- View all members with search functionality
- View detailed information for a specific member
- Update member information
- Delete members from the system

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Bootstrap for UI components
- React Icons for icons

### Backend
- Node.js with Express
- MySQL for database
- Sequelize for ORM
- Cors for cross-origin requests
- Dotenv for environment variables

## Project Structure

```
crud-app/
├── frontend/           # React frontend application
│   ├── public/         # Public assets
│   └── src/            # React source files
│       ├── components/ # React components
│       └── App.js      # Main application component
│
└── backend/            # Node.js backend API
    ├── controllers/    # Request handlers
    ├── models/         # Database models
    ├── routes/         # API routes
    ├── database.sql    # SQL schema and sample data
    └── server.js       # Express server setup
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Database Setup

1. Create the MySQL database using the provided SQL file:
   ```
   mysql -u root -p < backend/database.sql
   ```
   Or run the SQL commands from the `database.sql` file in your MySQL client/workbench.

### Setup and Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Configure the `.env` file in the backend directory with your MySQL connection details:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=gym_management
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   ```
4. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```
2. Start the frontend development server:
   ```
   cd ../frontend
   npm start
   ```
3. Access the application at `http://localhost:3000`

## API Endpoints

- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get a specific member
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member
