/**
 * MemberDetails Component
 * 
 * This component displays detailed information about a single member.
 * It's part of the READ operation in our CRUD application but focused on a single record.
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaArrowLeft, FaUser } from 'react-icons/fa';

const MemberDetails = () => {
  // Get member ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State variables
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API URL for members
  const API_URL = 'http://localhost:5000/api/members';
  
  // Fetch member data when component mounts
  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        
        // GET request to fetch member by ID
        const response = await axios.get(`${API_URL}/${id}`);
        
        setMember(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load member data. Please try again.');
        setLoading(false);
        console.error('Error fetching member:', err);
      }
    };
    
    fetchMember();
  }, [id]); // Re-run when id changes
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle member deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        // DELETE request to remove member
        await axios.delete(`${API_URL}/${id}`);
        
        alert('Member deleted successfully');
        // Navigate back to members list
        navigate('/members');
      } catch (err) {
        setError('Failed to delete member');
        console.error('Error deleting member:', err);
      }
    }
  };
  
  // Show loading indicator while fetching data
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading member details...</p>
      </div>
    );
  }
  
  // Show error message if fetch failed
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <hr />
        <Link to="/members" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Back to Members
        </Link>
      </div>
    );
  }
  
  // Show not found message if member doesn't exist
  if (!member) {
    return (
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Member Not Found</h4>
        <p>The member you're looking for doesn't exist or has been removed.</p>
        <hr />
        <Link to="/members" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Back to Members
        </Link>
      </div>
    );
  }
  
  return (
    <div className="member-details">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><FaUser className="me-2" /> Member Details</h2>
        <div>
          <Link to="/members" className="btn btn-secondary me-2">
            <FaArrowLeft className="me-1" /> Back to Members
          </Link>
          <Link to={`/members/edit/${id}`} className="btn btn-warning me-2">
            <FaEdit className="me-1" /> Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <FaTrash className="me-1" /> Delete
          </button>
        </div>
      </div>
      
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title mb-0">{member.name}</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Personal Information</h5>
              <hr />
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Phone:</strong> {member.phone}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`badge ${member.active ? 'bg-success' : 'bg-danger'}`}>
                  {member.active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
            
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Membership Information</h5>
              <hr />
              <p>
                <strong>Membership Type:</strong>{' '}
                <span className={`badge bg-${
                  member.membershipType === 'Premium' ? 'success' : 
                  member.membershipType === 'Standard' ? 'primary' : 'secondary'
                }`}>
                  {member.membershipType}
                </span>
              </p>
              <p>
                <strong>Joined:</strong> {formatDate(member.joiningDate)}
              </p>
              <p>
                <strong>Member Since:</strong> {formatDate(member.createdAt)}
              </p>
              <p>
                <strong>Last Updated:</strong> {formatDate(member.updatedAt)}
              </p>
            </div>
          </div>
          
          {/* Additional information can be added here if needed */}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
