import createError from '../utils/createError.js'; // Import the createError utility function.
import Order from '../models/order.model.js'; // Import the Order model.
import Gig from '../models/gig.model.js'; // Import the Gig model.
import Stripe from 'stripe'; // Import the Stripe library for payment processing.

// Controller function to create a payment intent for an order.
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE); // Create a new instance of the Stripe client.

  // Find the gig associated with the provided gig ID.
  const gig = await Gig.findById(req.params.id);

  // Create a payment intent using the Stripe API.
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100, // Convert the gig price to cents.
    currency: 'usd', // Set the currency to USD.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // Create a new order in the database.
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id, // Store the payment intent ID in the order.
  });

  await newOrder.save(); // Save the new order to the database.

  // Send back the client secret of the payment intent to the client.
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

// Controller function to get a list of completed orders.
export const getOrders = async (req, res, next) => {
  try {
    // Find orders based on whether the user is a buyer or a seller, and whether the order is completed.
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders); // Send the list of completed orders to the client.
  } catch (err) {
    next(err);
  }
};

// Controller function to confirm an order.
export const confirm = async (req, res, next) => {
  try {
    // Find and update the order based on the provided payment intent ID.
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true, // Mark the order as completed.
        },
      }
    );

    res.status(200).send('Order has been confirmed.'); // Send a confirmation message to the client.
  } catch (err) {
    next(err);
  }
};
