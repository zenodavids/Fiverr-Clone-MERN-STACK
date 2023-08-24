import React from 'react';
import { Link } from 'react-router-dom';
import './MyGigs.scss';
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

// Define the MyGigs component
function MyGigs() {
  // Get the current user
  const currentUser = getCurrentUser();

  // Get the query client
  const queryClient = useQueryClient();

  // Fetch data using the useQuery hook
  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      // Fetch user-specific gigs using newRequest
      newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  // Use the useMutation hook to handle gig deletion
  const mutation = useMutation({
    mutationFn: (id) => {
      // Delete a gig using newRequest
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      // Invalidate the 'myGigs' query after successful deletion
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  // Handle gig deletion
  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className='myGigs'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Gigs</h1>
            {/* Display "Add New Gig" button for sellers */}
            {currentUser.isSeller && (
              <Link to='/add'>
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through gig data and display each gig */}
              {data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className='image' src={gig.cover} alt='' />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    {/* Display "Delete" button for each gig */}
                    <img
                      className='delete'
                      src='./img/delete.png'
                      alt=''
                      onClick={() => handleDelete(gig._id)}
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
}

// Export the MyGigs component
export default MyGigs;
