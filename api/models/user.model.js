// Import Mongoose module
import mongoose from 'mongoose';

// Destructure Schema from Mongoose
const { Schema } = mongoose;

// Create a new User schema using the Schema class
const userSchema = new Schema(
  {
    // Username of the user
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Email address of the user
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Password of the user
    password: {
      type: String,
      required: true,
    },
    // Profile image URL (optional)
    img: {
      type: String,
      required: false,
    },
    // Country of the user
    country: {
      type: String,
      required: true,
    },
    // Phone number of the user (optional)
    phone: {
      type: String,
      required: false,
    },
    // Description or bio of the user (optional)
    desc: {
      type: String,
      required: false,
    },
    // Flag indicating whether the user is a seller (default: false)
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Enable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Create and export the User model using the userSchema
export default mongoose.model('User', userSchema);
