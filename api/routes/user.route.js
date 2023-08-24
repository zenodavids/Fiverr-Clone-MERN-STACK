// Import necessary modules and functions
import express from 'express'; // Import Express framework
import { deleteUser, getUser } from '../controllers/user.controller.js'; // Import deleteUser and getUser controllers
import { verifyToken } from '../middleware/jwt.js'; // Import verifyToken middleware for JWT validation

// Create an Express router instance
const router = express.Router();

// Define routes and associated controllers/middleware
router.delete('/:id', verifyToken, deleteUser); // DELETE route to delete a user, requires JWT verification
router.get('/:id', getUser); // GET route to get user details

// Export the router to be used in other parts of the application
export default router;
