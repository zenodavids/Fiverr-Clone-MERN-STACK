// Import Mongoose module
import mongoose from 'mongoose';

// Destructure Schema from Mongoose
const { Schema } = mongoose;

// Create a new Review schema using the Schema class
const ReviewSchema = new Schema(
  {
    // ID of the associated gig
    gigId: {
      type: String,
      required: true,
    },
    // ID of the user who posted the review
    userId: {
      type: String,
      required: true,
    },
    // Star rating for the review (1 to 5)
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5], // Allow only these values for star rating
    },
    // Description of the review
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Enable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Create and export the Review model using the ReviewSchema
export default mongoose.model('Review', ReviewSchema);
