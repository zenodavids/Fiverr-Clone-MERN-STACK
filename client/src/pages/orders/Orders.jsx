import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import necessary components from 'react-router-dom'.
import './Orders.scss'; // Import the Orders component stylesheet.
import { useQuery } from '@tanstack/react-query'; // Import the useQuery hook from the 'react-query' library.
import newRequest from '../../utils/newRequest'; // Import the newRequest utility function for making API requests.

const Orders = () => {
  // Get the current user from localStorage.
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Get the 'navigate' function from the router.
  const navigate = useNavigate();

  // Use the 'useQuery' hook to fetch orders data.
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  // Function to handle opening a conversation.
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      // Try to get the existing conversation.
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`); // Navigate to the existing conversation.
    } catch (err) {
      // If conversation doesn't exist, create a new one.
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`); // Navigate to the new conversation.
      }
    }
  };

  return (
    <div className='orders'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the orders data and render each order */}
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className='image' src={order.img} alt='' />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    {/* Render a message icon for contacting */}
                    <img
                      className='message'
                      src='./img/message.png'
                      alt=''
                      onClick={() => handleContact(order)} // Call handleContact on click
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
