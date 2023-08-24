// Import Mongoose module
import mongoose from 'mongoose';

// Destructure Schema from Mongoose
const { Schema } = mongoose;

// Create a new Conversation schema using the Schema class
const ConversationSchema = new Schema(
  {
    // Unique ID of the conversation
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // ID of the seller participating in the conversation
    sellerId: {
      type: String,
      required: true,
    },
    // ID of the buyer participating in the conversation
    buyerId: {
      type: String,
      required: true,
    },
    // Flag indicating whether the seller has read the conversation
    readBySeller: {
      type: Boolean,
      required: true,
    },
    // Flag indicating whether the buyer has read the conversation
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    // Content of the last message in the conversation (optional)
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Enable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Create and export the Conversation model using the ConversationSchema
export default mongoose.model('Conversation', ConversationSchema);
