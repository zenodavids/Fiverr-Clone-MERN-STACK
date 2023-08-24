import createError from '../utils/createError.js'; // Import a utility function for creating custom errors.
import Message from '../models/message.model.js'; // Import the Message model.
import Conversation from '../models/conversation.model.js'; // Import the Conversation model.

export const createMessage = async (req, res, next) => {
  // Controller function to create a new message.
  const newMessage = new Message({
    conversationId: req.body.conversationId, // Get conversation ID from the request body.
    userId: req.userId, // Get user ID from the request object.
    desc: req.body.desc, // Get the message content from the request body.
  });

  try {
    const savedMessage = await newMessage.save(); // Save the new message to the database.
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId }, // Find the conversation by ID.
      {
        $set: {
          readBySeller: req.isSeller, // Update read status based on user role.
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc, // Update the last message in the conversation.
        },
      },
      { new: true } // Return the updated conversation.
    );

    res.status(201).send(savedMessage); // Send a successful response with the saved message.
  } catch (err) {
    next(err); // Handle errors using the next middleware.
  }
};

export const getMessages = async (req, res, next) => {
  // Controller function to get messages by conversation ID.
  try {
    const messages = await Message.find({ conversationId: req.params.id }); // Find messages by conversation ID.
    res.status(200).send(messages); // Send a successful response with the messages.
  } catch (err) {
    next(err); // Handle errors using the next middleware.
  }
};
