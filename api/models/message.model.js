// Import Mongoose module
import mongoose from 'mongoose';

// Destructure Schema from Mongoose
const { Schema } = mongoose;

// Create a new Message schema using the Schema class
const MessageSchema = new Schema(
  {
    // ID of the associated conversation
    conversationId: {
      type: String,
      required: true,
    },
    // ID of the user who sent the message
    userId: {
      type: String,
      required: true,
    },
    // Content of the message
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Enable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Create and export the Message model using the MessageSchema
export default mongoose.model('Message', MessageSchema);
