import express from 'express'; // Import Express framework.
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from '../controllers/conversation.controller.js'; // Import controller functions.
import { verifyToken } from '../middleware/jwt.js'; // Import JWT verification middleware.

const router = express.Router(); // Create a new router instance using Express.

// Define routes with their corresponding HTTP methods and middleware.

// Route to get a list of conversations.
router.get('/', verifyToken, getConversations);

// Route to create a new conversation.
router.post('/', verifyToken, createConversation);

// Route to get details of a single conversation by ID.
router.get('/single/:id', verifyToken, getSingleConversation);

// Route to update read status of a conversation.
router.put('/:id', verifyToken, updateConversation);

export default router; // Export the router for use in other parts of the application.
