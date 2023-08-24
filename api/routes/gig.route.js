// Import the Express framework
import express from 'express';
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  // Import the gig-related controllers
} from '../controllers/gig.controller.js';
// Import the verifyToken middleware for JWT validation
import { verifyToken } from '../middleware/jwt.js';

// Create an Express router instance
const router = express.Router();

// Define routes and associate them with corresponding controllers/middleware
// POST route for creating a new gig, requires JWT verification
router.post('/', verifyToken, createGig);
// DELETE route for deleting a gig by ID, requires JWT verification
router.delete('/:id', verifyToken, deleteGig);
// GET route to retrieve details of a single gig by ID
router.get('/single/:id', getGig);
// GET route to retrieve a list of all gigs
router.get('/', getGigs);

// Export the router to be used in other parts of the application
export default router;
