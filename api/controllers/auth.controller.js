// Import necessary modules and functions
import User from '../models/user.model.js'; // Import the User model
import createError from '../utils/createError.js'; // Import the createError utility function
import bcrypt from 'bcrypt'; // Import the bcrypt library for password hashing
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for JWT authentication

// Controller to register a new user
export const register = async (req, res, next) => {
  try {
    // Hash the password using bcrypt - 5 is the salt... could be any number
    const hash = bcrypt.hashSync(req.body.password, 5);

    // Create a new User instance with hashed password
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).send('User has been created.');
  } catch (err) {
    // Pass the error to the next middleware
    next(err);
    // res.status(500).send('got issues.');
  }
};

// Controller to handle user login
export const login = async (req, res, next) => {
  try {
    // Find the user by username in the database
    const user = await User.findOne({ username: req.body.username });
    // If user not found, return a 404 error
    if (!user) return next(createError(404, 'User not found!'));
    // Compare the provided password with the stored hash
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    // If password is incorrect, return a 400 error
    if (!isCorrect)
      return next(createError(400, 'Wrong password or username!'));
    // Create a JWT token with user data
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    // Exclude password from user information
    const { password, ...info } = user._doc;
    // Set the JWT token as an HTTP-only cookie and send user info
    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    // Pass the error to the next middleware
    next(err);
  }
};

//! INFO: for advanced logout, use a black list array or redis
// Controller to handle user logout
export const logout = async (req, res) => {
  // Clear the access token cookie and send a success response
  res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('User has been logged out.');
};
