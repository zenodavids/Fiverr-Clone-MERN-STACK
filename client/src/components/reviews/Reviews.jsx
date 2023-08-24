import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; // Import required hooks from react-query.
import React from 'react'; // Import the React library.
import newRequest from '../../utils/newRequest'; // Import the newRequest utility.
import Review from '../review/Review'; // Import the Review component.
import './Reviews.scss'; // Import the Reviews component's styling.

// Reviews component that displays a list of reviews and allows adding new reviews.
const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient(); // Initialize the query client from the react-query hook.

  // Use the useQuery hook to fetch reviews based on the gigId.
  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews'], // The query key for reviews.
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data; // Return the reviews data from the API response.
      }),
  });

  // Use the useMutation hook to handle creating a new review.
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post('/reviews', review); // Send a post request to create a review.
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']); // Invalidate the "reviews" query to trigger a refetch.
    },
  });

  // Handle form submission to add a new review.
  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value; // Get the review description from the form input.
    const star = e.target[1].value; // Get the star rating from the form select.
    mutation.mutate({ gigId, desc, star }); // Call the mutation to add the new review.
  };

  return (
    <div className='reviews'>
      {' '}
      {/* Container for the reviews */}
      <h2>Reviews</h2> {/* Title for the reviews section */}
      {isLoading
        ? 'loading' // Display "loading" while data is being fetched.
        : error
        ? 'Something went wrong!' // Display "Something went wrong!" if there's an error.
        : data.map((review) => (
            <Review key={review._id} review={review} /> // Display each review using the Review component.
          ))}
      <div className='add'>
        {' '}
        {/* Container for adding a new review */}
        <h3>Add a review</h3> {/* Title for the new review section */}
        <form action='' className='addForm' onSubmit={handleSubmit}>
          {/* Form for adding a new review */}
          <input type='text' placeholder='write your opinion' />{' '}
          {/* Input for review description */}
          <select name='' id=''>
            {/* Select for star rating */}
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button> {/* Submit button to add the new review */}
        </form>
      </div>
    </div>
  );
};

export default Reviews; // Export the Reviews component for use in other parts of the application.
