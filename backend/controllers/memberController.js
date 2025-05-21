/**
 * Member Controller
 * 
 * This controller manages all business logic for member operations.
 * It handles CRUD operations (Create, Read, Update, Delete) for gym members.
 * Each function corresponds to a specific API endpoint and HTTP method.
 */

const db = require('../models/index');
const Member = db.members;

// Controller object containing all member-related functions
const memberController = {
  
  /**
   * Get all members
   * GET /api/members
   * 
   * This function retrieves all members from the database
   * It supports optional filtering via query parameters
   */
  getAllMembers: async (req, res) => {
    try {
      // Find all members, or filter by query parameters if provided
      // Can be extended to implement pagination, sorting, etc.
      const members = await Member.findAll();
      
      // Return members as JSON response
      res.status(200).json({
        success: true,
        count: members.length,
        data: members
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({
        success: false,
        message: 'Failed to fetch members',
        error: error.message
      });
    }
  },

  /**
   * Get a specific member by ID
   * GET /api/members/:id
   * 
   * This function retrieves a single member by its ID
   */
  getMemberById: async (req, res) => {
    try {
      // Extract member ID from request parameters
      const { id } = req.params;
      
      // Find member by primary key (ID)
      const member = await Member.findByPk(id);
      
      // If member not found, return 404
      if (!member) {
        return res.status(404).json({
          success: false,
          message: `Member with id ${id} not found`
        });
      }
      
      // Return member as JSON response
      res.status(200).json({
        success: true,
        data: member
      });
    } catch (error) {
      // Handle errors, including invalid ID format
      res.status(500).json({
        success: false,
        message: 'Failed to fetch member',
        error: error.message
      });
    }
  },

  /**
   * Create a new member
   * POST /api/members
   * 
   * This function creates a new member based on request body data
   */
  createMember: async (req, res) => {
    try {
      // Extract member data from request body
      const memberData = req.body;
      
      // Create new member record
      const newMember = await Member.create(memberData);
      
      // Return newly created member
      res.status(201).json({
        success: true,
        message: 'Member created successfully',
        data: newMember
      });
    } catch (error) {
      // Handle validation errors or other issues
      res.status(400).json({
        success: false,
        message: 'Failed to create member',
        error: error.message
      });
    }
  },

  /**
   * Update an existing member
   * PUT /api/members/:id
   * 
   * This function updates a member based on ID and request body data
   */
  updateMember: async (req, res) => {
    try {
      // Extract member ID from request parameters
      const { id } = req.params;
      
      // Extract updated data from request body
      const updateData = req.body;
      
      // Find the member first to check if it exists
      const member = await Member.findByPk(id);
      
      // If member not found, return 404
      if (!member) {
        return res.status(404).json({
          success: false,
          message: `Member with id ${id} not found`
        });
      }
      
      // Update the member
      await member.update(updateData);
      
      // Get the refreshed member data
      const updatedMember = await Member.findByPk(id);
      
      // Return updated member
      res.status(200).json({
        success: true,
        message: 'Member updated successfully',
        data: updatedMember
      });
    } catch (error) {
      // Handle validation errors or other issues
      res.status(400).json({
        success: false,
        message: 'Failed to update member',
        error: error.message
      });
    }
  },

  /**
   * Delete a member
   * DELETE /api/members/:id
   * 
   * This function removes a member from the database by ID
   */
  deleteMember: async (req, res) => {
    try {
      // Extract member ID from request parameters
      const { id } = req.params;
      
      // Find the member first to check if it exists
      const member = await Member.findByPk(id);
      
      // If member not found, return 404
      if (!member) {
        return res.status(404).json({
          success: false,
          message: `Member with id ${id} not found`
        });
      }
      
      // Save member data before deletion to return in response
      const memberData = { ...member.toJSON() };
      
      // Delete the member
      await member.destroy();
      
      // Return success message with deleted member data
      res.status(200).json({
        success: true,
        message: 'Member deleted successfully',
        data: memberData
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({
        success: false,
        message: 'Failed to delete member',
        error: error.message
      });
    }
  }
};

module.exports = memberController;
