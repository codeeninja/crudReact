/**
 * Member Routes
 * 
 * This file defines all API routes related to member management.
 * It maps HTTP methods and URL patterns to controller functions.
 * All routes here will be prefixed with '/api/members' from server.js
 */

const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Route: /api/members
// Methods: GET, POST
router.route('/')
  // GET - Fetch all members
  .get(memberController.getAllMembers)
  // POST - Create a new member
  .post(memberController.createMember);

// Route: /api/members/:id
// Methods: GET, PUT, DELETE
router.route('/:id')
  // GET - Fetch a specific member by ID
  .get(memberController.getMemberById)
  // PUT - Update a specific member
  .put(memberController.updateMember)
  // DELETE - Remove a specific member
  .delete(memberController.deleteMember);

module.exports = router;
