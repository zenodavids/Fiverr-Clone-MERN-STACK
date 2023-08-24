import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

// Define a React component for the success page
const Success = () => {
  // Access the current location's search parameters and navigation function
  const { search } = useLocation();
  const navigate = useNavigate();

  // Parse the payment_intent from the URL search parameters
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  // Effect to perform actions when the component mounts
  useEffect(() => {
    // Define an asynchronous function to make a request
    const makeRequest = async () => {
      try {
        // Update the order's payment status using the received payment_intent
        await newRequest.put('/orders', { payment_intent });

        // After a delay, navigate to the orders page
        setTimeout(() => {
          navigate('/orders');
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    // Call the defined function
    makeRequest();
  }, []);

  return (
    <div>
      {/* Display a message to indicate successful payment */}
      Payment successful. You are being redirected to the orders page. Please do
      not close the page.
    </div>
  );
};

export default Success;
