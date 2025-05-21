/**
 * Home Component
 * 
 * This component serves as the landing page of our application.
 * It provides an overview of the system and quick links to key functions.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUsers } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow-lg">
          <div className="card-body text-center p-5">
            <h1 className="display-4 mb-4">Gym Management System</h1>
            <p className="lead mb-4">
              A comprehensive solution for managing gym members with full CRUD functionality.
              Easily add, view, update, and delete member records.
            </p>
            
            {/* Quick action buttons */}
            <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-4">
              <Link to="/members" className="btn btn-primary btn-lg px-4">
                <FaUsers className="me-2" /> View All Members
              </Link>
              <Link to="/members/add" className="btn btn-success btn-lg px-4">
                <FaUserPlus className="me-2" /> Add New Member
              </Link>
            </div>
            
            {/* Feature highlights */}
            <div className="row mt-5">
              <div className="col-md-4 mb-3">
                <div className="card h-100 bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Member Management</h5>
                    <p className="card-text">Efficiently manage all your gym members in one place.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Real-time Updates</h5>
                    <p className="card-text">All changes are immediately reflected in the database.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 bg-light">
                  <div className="card-body">
                    <h5 className="card-title">User-Friendly Interface</h5>
                    <p className="card-text">Clean, intuitive design for smooth user experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
