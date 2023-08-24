import express from 'express'; // Import the Express framework.
import {
  createMessage,
  getMessages,
} from '../controllers/message.controller.js'; // Import the message-related controller functions.
import { verifyToken } from '../middleware/jwt.js'; // Import the middleware for verifying tokens.

const router = express.Router(); // Create an instance of the Express router.

// Define routes and their corresponding controller functions.
router.post('/', verifyToken, createMessage); // Route for creating a new message.
router.get('/:id', verifyToken, getMessages); // Route for getting messages by conversation ID.

export default router; // Export the router for use in other parts of the application.
