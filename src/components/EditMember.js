/**
 * EditMember Component
 * 
 * This component handles the UPDATE operation in our CRUD application.
 * It fetches existing member data and provides a form to edit member information.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSave, FaTimes, FaUserEdit } from 'react-icons/fa';

const EditMember = () => {
  // Get member ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  
  // API URL for members
  const API_URL = 'http://localhost:5000/api/members';
  
  // State for form data with initial empty values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'Basic',
    active: true
  });
  
  // State for tracking loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  // Destructure form fields from state for easier access
  const { name, email, phone, membershipType, active } = formData;
  
  // Fetch member data on component mount
  useEffect(() => {
    const fetchMember = async () => {
      try {
        setIsLoading(true);
        
        // GET request to fetch member by ID
        const response = await axios.get(`${API_URL}/${id}`);
        const memberData = response.data.data;
        
        // Update form state with fetched data
        setFormData({
          name: memberData.name,
          email: memberData.email,
          phone: memberData.phone,
          membershipType: memberData.membershipType,
          active: memberData.active
        });
        
        setIsLoading(false);
      } catch (err) {
        setApiError('Failed to load member data. Please try again.');
        setIsLoading(false);
        console.error('Error fetching member:', err);
      }
    };
    
    fetchMember();
  }, [id]); // Run when id changes
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For checkbox inputs, use the checked property instead of value
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear any error for this field when the user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    
    // Form is valid if newErrors object has no properties
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setApiError(null);
      
      // PUT request to update member
      const response = await axios.put(`${API_URL}/${id}`, formData);
      
      setIsSubmitting(false);
      
      // Show success message
      alert('Member updated successfully!');
      
      // Navigate back to members list
      navigate('/members');
    } catch (err) {
      setIsSubmitting(false);
      
      // Handle API error
      setApiError(
        err.response?.data?.message || 
        'Failed to update member. Please try again.'
      );
      
      console.error('Error updating member:', err);
    }
  };
  
  // If data is still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading member data...</p>
      </div>
    );
  }
  
  return (
    <div className="edit-member">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><FaUserEdit className="me-2" /> Edit Member</h2>
        <Link to="/members" className="btn btn-secondary">
          Back to Members
        </Link>
      </div>
      
      <div className="card shadow">
        <div className="card-body">
          {/* Display API errors */}
          {apiError && (
            <div className="alert alert-danger" role="alert">
              {apiError}
            </div>
          )}
          
          {/* Member edit form */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Name field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter member's full name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              
              {/* Email field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              
              {/* Phone field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              
              {/* Membership type field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="membershipType" className="form-label">Membership Type</label>
                <select
                  className="form-select"
                  id="membershipType"
                  name="membershipType"
                  value={membershipType}
                  onChange={handleChange}
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              
              {/* Active status */}
              <div className="col-md-12 mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={active}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="active">
                    Active Member
                  </label>
                </div>
              </div>
            </div>
            
            {/* Form buttons */}
            <div className="d-flex justify-content-end mt-3">
              <Link to="/members" className="btn btn-secondary me-2">
                <FaTimes className="me-1" /> Cancel
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                <FaSave className="me-1" /> 
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
