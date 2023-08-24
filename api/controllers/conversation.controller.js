import createError from '../utils/createError.js'; // Import necessary modules and dependencies.
import Conversation from '../models/conversation.model.js';

// Controller to create a new conversation.
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId, // Generate a unique conversation ID based on user types and IDs.
    sellerId: req.isSeller ? req.userId : req.body.to, // Assign seller and buyer IDs based on user type.
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller, // Set read status based on user type.
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save(); // Save the new conversation to the database.
    res.status(201).send(savedConversation); // Send the saved conversation as a response.
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware.
  }
};

// Controller to update conversation read status.
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true, // Set read status for seller to true.
          // readByBuyer: true, // Set read status for buyer to true.
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }), // Update read status based on user type.
        },
      },
      { new: true } // Return the updated conversation.
    );

    res.status(200).send(updatedConversation); // Send the updated conversation as a response.
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware.
  }
};

// Controller to get a single conversation.
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id }); // Find the conversation by ID.
    if (!conversation) return next(createError(404, 'Not found!')); // If conversation doesn't exist, return a 404 error.
    res.status(200).send(conversation); // Send the conversation as a response.
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware.
  }
};

// Controller to get list of conversations.
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId } // Get conversations based on user type.
    ).sort({ updatedAt: -1 }); // Sort conversations by update time in descending order.
    res.status(200).send(conversations); // Send the conversations as a response.
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware.
  }
};
