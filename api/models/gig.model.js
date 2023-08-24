// Import Mongoose module
import mongoose from 'mongoose';

// Destructure Schema from Mongoose
const { Schema } = mongoose;

// Create a new Gig schema using the Schema class
const GigSchema = new Schema(
  {
    // Owner of the gig
    userId: {
      type: String,
      required: true,
    },
    // Title of the gig
    title: {
      type: String,
      required: true,
    },
    // Description of the gig
    desc: {
      type: String,
      required: true,
    },
    // Total stars accumulated for reviews
    totalStars: {
      type: Number,
      default: 0,
    },
    // Number of stars for the gig
    starNumber: {
      type: Number,
      default: 0,
    },
    // Category of the gig
    cat: {
      type: String,
      required: true,
    },
    // Price of the gig
    price: {
      type: Number,
      required: true,
    },
    // Cover image for the gig
    cover: {
      type: String,
      required: true,
    },
    // Images associated with the gig
    images: {
      type: [String],
      required: false,
    },
    // Short title for the gig
    shortTitle: {
      type: String,
      required: true,
    },
    // Short description for the gig
    shortDesc: {
      type: String,
      required: true,
    },
    // Delivery time for the gig in days
    deliveryTime: {
      type: Number,
      required: true,
    },
    // Number of allowed revisions for the gig
    revisionNumber: {
      type: Number,
      required: true,
    },
    // Features offered by the gig
    features: {
      type: [String],
      required: false,
    },
    // Number of sales for the gig
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Enable automatic timestamp fields (createdAt, updatedAt)
  }
);

// Create and export the Gig model using the GigSchema
export default mongoose.model('Gig', GigSchema);
