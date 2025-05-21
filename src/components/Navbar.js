/**
 * Navbar Component
 * 
 * This component renders the navigation bar at the top of our application.
 * It provides links to different sections of our app.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaHome } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* App brand/logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <FaUsers className="me-2" /> Gym Management System
        </Link>
        
        {/* Responsive toggle button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/members">
                <FaUsers className="me-1" /> Members
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
