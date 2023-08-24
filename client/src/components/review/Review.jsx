import { useQuery } from '@tanstack/react-query'; // Import the useQuery hook from react-query.
import React from 'react'; // Import the React library.
import newRequest from '../../utils/newRequest'; // Import the newRequest utility.
import './Review.scss'; // Import the Review component's styling.

// Review component that displays a single review.
const Review = ({ review }) => {
  // Use the useQuery hook to fetch user data based on review.userId.
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId], // The query key is an array with review.userId.
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data; // Return the user data from the API response.
      }),
  });

  return (
    <div className='review'>
      {' '}
      {/* Container for the review */}
      {isLoading ? (
        'loading' // Display "loading" while data is being fetched.
      ) : error ? (
        'error' // Display "error" if there is an error fetching the data.
      ) : (
        <div className='user'>
          {' '}
          {/* Container for user information */}
          <img
            className='pp'
            src={data.img || '/img/noavatar.jpg'} // Display user's profile picture or a default image.
            alt=''
          />
          <div className='info'>
            {' '}
            {/* Container for user info */}
            <span>{data.username}</span> {/* Display the username */}
            <div className='country'>
              {' '}
              {/* Container for country info */}
              <span>{data.country}</span> {/* Display the user's country */}
            </div>
          </div>
        </div>
      )}
      <div className='stars'>
        {' '}
        {/* Container for star ratings */}
        {Array(review.star) // Create an array with the number of stars in the review.
          .fill()
          .map((item, i) => (
            <img src='/img/star.png' alt='' key={i} /> // Display a star image for each item in the array.
          ))}
        <span>{review.star}</span> {/* Display the number of stars */}
      </div>
      <p>{review.desc}</p> {/* Display the review description */}
      <div className='helpful'>
        {' '}
        {/* Container for helpful feedback */}
        <span>Helpful?</span> {/* Display "Helpful?" label */}
        <img src='/img/like.png' alt='' /> {/* Display "like" icon */}
        <span>Yes</span> {/* Display "Yes" label */}
        <img src='/img/dislike.png' alt='' /> {/* Display "dislike" icon */}
        <span>No</span> {/* Display "No" label */}
      </div>
    </div>
  );
};

export default Review; // Export the Review component for use in other parts of the application.
