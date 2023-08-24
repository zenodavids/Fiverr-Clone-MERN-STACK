import express from 'express'; // Import the Express framework.
import { verifyToken } from '../middleware/jwt.js'; // Import the verifyToken middleware.
import { getOrders, intent, confirm } from '../controllers/order.controller.js'; // Import the order-related controller functions.

const router = express.Router(); // Create a new router instance using Express.

// Define routes and their associated middleware and controller functions.

// Route to get a list of orders. Requires authentication using the verifyToken middleware.
router.get('/', verifyToken, getOrders);

// Route to create a payment intent for an order. Requires authentication using the verifyToken middleware.
router.post('/create-payment-intent/:id', verifyToken, intent);

// Route to confirm an order. Requires authentication using the verifyToken middleware.
router.put('/', verifyToken, confirm);

export default router; // Export the router to be used by the application.
