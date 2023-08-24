import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import createError from '../utils/createError.js'; // Import the createError utility function

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken; // Get the access token from the cookies

  // If no token is found, return a 401 Unauthorized error
  if (!token) return next(createError(401, 'You are not authenticated!'));

  // Verify the token using JWT and the JWT_KEY from environment variables
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    // If token verification fails, return a 403 Forbidden error
    if (err) return next(createError(403, 'Token is not valid!'));

    // Attach the user ID and isSeller flag to the request object
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    // Call the next middleware
    next();
  });
};
