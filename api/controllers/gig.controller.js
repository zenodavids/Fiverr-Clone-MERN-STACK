import Gig from '../models/gig.model.js'; // Import the Gig model
import createError from '../utils/createError.js'; // Import the createError utility function

// Controller to create a new gig
export const createGig = async (req, res, next) => {
  // Check if the user is a seller
  if (!req.isSeller)
    return next(createError(403, 'Only sellers can create a gig!'));

  // Create a new Gig instance with user ID and request body
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    // Save the new gig to the database
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

// Controller to delete a gig
export const deleteGig = async (req, res, next) => {
  try {
    // Find the gig by ID
    const gig = await Gig.findById(req.params.id);
    // Check if the current user is the owner of the gig
    if (gig.userId !== req.userId)
      return next(createError(403, 'You can delete only your gig!'));

    // Delete the gig
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send('Gig has been deleted!');
  } catch (err) {
    next(err);
  }
};

// Controller to get details of a single gig
export const getGig = async (req, res, next) => {
  try {
    // Find the gig by ID
    const gig = await Gig.findById(req.params.id);
    // If gig not found, return a 404 error
    if (!gig) next(createError(404, 'Gig not found!'));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

// Controller to get a list of gigs with filters and sorting
export const getGigs = async (req, res, next) => {
  const q = req.query;
  // Build filters based on query parameters
  // Construct filters object based on query parameters
  const filters = {
    ...(q.userId && { userId: q.userId }), // If userId is provided, add it to filters
    ...(q.cat && { cat: q.cat }), // If cat (category) is provided, add it to filters
    ...((q.min || q.max) && {
      // If min or max price is provided, construct nested price filter
      price: {
        ...(q.min && { $gt: q.min }), // If min price is provided, add $gt filter
        ...(q.max && { $lt: q.max }), // If max price is provided, add $lt filter
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }), // If search query is provided, add title filter with case-insensitive regex
  };

  try {
    // Find gigs based on filters and sort them
    //  Find gigs based on filters and sort them by the highest price first
    // const gigs = await Gig.find(filters).sort({ price: -1 });
    //  Find gigs based on filters and sort them by the latest first
    // const gigs = await Gig.find(filters).sort({ createdAt: -1 });
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
