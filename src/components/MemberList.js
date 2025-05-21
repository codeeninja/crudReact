/**
 * MemberList Component
 * 
 * This component handles the READ operation in our CRUD application.
 * It displays a list of all gym members and provides options to view, edit, or delete each member.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaUserPlus, FaSearch } from 'react-icons/fa';

const MemberList = () => {
  // State variables
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // API URL for members
  const API_URL = 'http://localhost:5000/api/members';
  
  // Fetch members from API on component mount
  useEffect(() => {
    // Function to fetch all members
    const fetchMembers = async () => {
      try {
        setLoading(true);
        // GET request to fetch all members
        const response = await axios.get(API_URL);
        // Update state with fetched data
        setMembers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch members. Please try again later.');
        setLoading(false);
        console.error('Error fetching members:', err);
      }
    };
    
    fetchMembers();
  }, []); // Empty dependency array ensures this runs once on mount
  
  // Function to handle member deletion
  const handleDelete = async (id) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        // DELETE request to remove member
        await axios.delete(`${API_URL}/${id}`);
        // Update state by filtering out the deleted member
        setMembers(members.filter(member => member.id !== id));
        alert('Member deleted successfully');
      } catch (err) {
        setError('Failed to delete member');
        console.error('Error deleting member:', err);
      }
    }
  };
  
  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="member-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Member Management</h2>
        <Link to="/members/add" className="btn btn-success">
          <FaUserPlus className="me-2" /> Add New Member
        </Link>
      </div>
      
      {/* Search bar */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search members by name, email, or membership type" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {/* Loading indicator */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading members...</p>
        </div>
      ) : (
        <>
          {/* Member count */}
          <p className="text-muted mb-3">Showing {filteredMembers.length} members</p>
          
          {/* Members table */}
          {filteredMembers.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Membership</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(member => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.phone}</td>
                      <td>
                        <span className={`badge bg-${
                          member.membershipType === 'Premium' ? 'success' : 
                          member.membershipType === 'Standard' ? 'primary' : 'secondary'
                        }`}>
                          {member.membershipType}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${member.active ? 'bg-success' : 'bg-danger'}`}>
                          {member.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          {/* View details button */}
                          <Link to={`/members/${member.id}`} className="btn btn-sm btn-info me-1">
                            <FaEye />
                          </Link>
                          
                          {/* Edit button */}
                          <Link to={`/members/edit/${member.id}`} className="btn btn-sm btn-warning me-1">
                            <FaEdit />
                          </Link>
                          
                          {/* Delete button */}
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(member.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // No results message
            <div className="alert alert-info">
              No members found. {searchTerm && 'Try a different search term or '} 
              <Link to="/members/add">add a new member</Link>.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemberList;
