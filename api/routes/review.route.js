import express from 'express'; // Import the Express framework.
import { verifyToken } from '../middleware/jwt.js'; // Import the JWT verification middleware.
import {
  createReview,
  getReviews,
  deleteReview,
} from '../controllers/review.controller.js'; // Import the review controller functions.

const router = express.Router(); // Create a new router instance.

// Route to create a new review
router.post('/', verifyToken, createReview);

// Route to get reviews for a specific gig
router.get('/:gigId', getReviews);

// Route to delete a review
router.delete('/:id', deleteReview);

export default router; // Export the router to be used in other parts of the application.
