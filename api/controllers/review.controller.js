import createError from '../utils/createError.js'; // Import the createError utility.
import Review from '../models/review.model.js'; // Import the Review model.
import Gig from '../models/gig.model.js'; // Import the Gig model.

// Create a new review
export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!")); // Check if the user is a seller, and if so, return an error.

  // Create a new Review object with the provided data.
  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, 'You have already created a review for this gig!')
      ); // Check if the user has already reviewed this gig, and if so, return an error.

    // TODO: Check if the user purchased the gig.

    const savedReview = await newReview.save(); // Save the new review.

    // Update the corresponding Gig's totalStars and starNumber fields.
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview); // Send the saved review as the response.
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware.
  }
};

// Get reviews for a specific gig
export const getReviews = async (req, res, next) => {
  try {
    // Find all reviews associated with the specified gigId.
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews); // Send the reviews as the response.
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware.
  }
};

// Delete a review (not implemented in this code snippet)
export const deleteReview = async (req, res, next) => {
  try {
    // Implementation for deleting a review could go here.
    // ==============================================
    //  const review = await Review.findById(req.params.reviewId);
    //  if (!review) {
    //    return next(createError(404, 'Review not found!'));
    //  }
    //  // Make sure the user trying to delete the review is the owner of the review
    //  if (req.userId !== review.userId.toString()) {
    //    return next(
    //      createError(403, "You don't have permission to delete this review!")
    //    );
    //  }
    //  // Update the corresponding Gig's totalStars and starNumber values
    //  await Gig.findByIdAndUpdate(review.gigId, {
    //    $inc: { totalStars: -review.star, starNumber: -1 },
    //  });
    //  // Remove the review from the database
    //  await Review.findByIdAndDelete(req.params.reviewId);
    //  res.status(200).send('Review has been deleted.');
    // ==============================================
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware.
  }
};
