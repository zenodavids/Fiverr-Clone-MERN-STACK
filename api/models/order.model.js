// Import Mongoose module
import mongoose from 'mongoose';

// Destructure Schema from Mongoose
const { Schema } = mongoose;

// Create a new Order schema using the Schema class
const OrderSchema = new Schema(
  {
    // ID of the associated gig
    gigId: {
      type: String,
      required: true,
    },
    // Image associated with the order
    img: {
      type: String,
      required: false,
    },
    // Title of the gig
    title: {
      type: String,
      required: true,
    },
    // Price of the gig
    price: {
      type: Number,
      required: true,
    },
    // ID of the seller
    sellerId: {
      type: String,
      required: true,
    },
    // ID of the buyer
    buyerId: {
      type: String,
      required: true,
    },
    // Flag indicating whether the order is completed
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // Payment intent associated with the order
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Enable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Create and export the Order model using the OrderSchema
export default mongoose.model('Order', OrderSchema);
