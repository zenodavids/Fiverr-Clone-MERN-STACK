import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; // Import React Query hooks.
import React from 'react'; // Import React library.
import { Link } from 'react-router-dom'; // Import react-router-dom's Link component.
import newRequest from '../../utils/newRequest'; // Import custom utility function for making requests.
import './Messages.scss'; // Import the CSS styles for this component.
import moment from 'moment'; // Import the 'moment' library for handling time formatting.

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get current user from local storage.

  const queryClient = useQueryClient(); // Initialize React Query's query client.

  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'], // Unique query key for caching.
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }), // Fetch conversation data.
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    },
  }); // Use mutation hook for marking messages as read.

  const handleRead = (id) => {
    mutation.mutate(id); // Call the mutation when marking a message as read.
  };

  return (
    <div className='messages'>
      {isLoading ? (
        'loading' // Display loading message while data is loading.
      ) : error ? (
        'error' // Display error message if there's an error fetching data.
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr
                  className={
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) &&
                    'active' // Add 'active' class to unread messages.
                  }
                  key={c.id}
                >
                  <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className='link'>
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>{' '}
                  {/* Format date using 'moment' library. */}
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button> // Display 'Mark as Read' button for unread messages.
                    )}
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

export default Messages; // Export the Messages component.
