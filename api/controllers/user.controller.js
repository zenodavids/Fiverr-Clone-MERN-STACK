// Import the User model and the createError utility function
import User from '../models/user.model.js'; // Import the User model
import createError from '../utils/createError.js'; // Import the createError utility function

// Controller to delete a user
export const deleteUser = async (req, res, next) => {
  // Find the user by ID
  const user = await User.findById(req.params.id);

  // Check if the authenticated user's ID matches the user being deleted
  if (req.userId !== user._id.toString()) {
    // If not, return a 403 Forbidden error
    return next(createError(403, 'You can delete only your account!'));
  }

  // If authorized, delete the user by ID
  await User.findByIdAndDelete(req.params.id);

  // Send a success response
  res.status(200).send('Deleted.');
};

// Controller to get user details
export const getUser = async (req, res, next) => {
  // Find the user by ID
  const user = await User.findById(req.params.id);

  // Send the user details in the response
  res.status(200).send(user);
};
