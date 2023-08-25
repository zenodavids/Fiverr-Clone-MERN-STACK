// Import necessary modules and libraries
import express from 'express'; // Express framework for building APIs
import mongoose from 'mongoose'; // Mongoose for MongoDB object modeling
import dotenv from 'dotenv'; // Load environment variables from a .env file
import userRoute from './routes/user.route.js'; // Import user route
import gigRoute from './routes/gig.route.js'; // Import gig route
import orderRoute from './routes/order.route.js'; // Import order route
import conversationRoute from './routes/conversation.route.js'; // Import conversation route
import messageRoute from './routes/message.route.js'; // Import message route
import reviewRoute from './routes/review.route.js'; // Import review route
import authRoute from './routes/auth.route.js'; // Import authentication route
import cookieParser from 'cookie-parser'; // Parse cookies from incoming requests
import cors from 'cors'; // Enable Cross-Origin Resource Sharing (CORS)

// Create an Express app instance
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set strictQuery to true for better query validation (Mongoose feature)
mongoose.set('strictQuery', true);

// Connect to MongoDB using async/await and try/catch
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // Connect to MongoDB using the MONGO environment variable
    console.log('Connected to mongoDB!');
  } catch (error) {
    console.log(error);
  }
};

// Use CORS middleware to allow requests from a specific origin with credentials
// "'http://localhost:5173'" is the frontend local host domain
app.use(
  cors({
    origin: 'https://fiverr-clone-frontend-eyia7ewnf-zenodavids.vercel.app/',
    credentials: true,
  })
);

// Parse incoming JSON data
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

// Set up routes for various endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/reviews', reviewRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  // Respond with appropriate error status and message
  return res.status(errorStatus).send(errorMessage);
});

// Start the Express app on port 8800
app.listen(8800, () => {
  connect(); // Call the connect function to establish a MongoDB connection
  console.log('Backend server is running on port 8800!');
});
