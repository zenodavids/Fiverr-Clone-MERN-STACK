import React from 'react';
import './GigCard.scss'; // Import the component's CSS styles
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import { useQuery } from '@tanstack/react-query'; // Import the useQuery hook from react-query
import newRequest from '../../utils/newRequest'; // Import a utility for making API requests

// The GigCard component receives a 'item' prop containing gig data
const GigCard = ({ item }) => {
  // Fetch user data using useQuery
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId], // Unique query key based on user ID
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${item._id}`} className='link'>
      {' '}
      {/* Link to gig details */}
      <div className='gigCard'>
        <img src={item.cover} alt='' />
        <div className='info'>
          {/* Display user information */}
          {isLoading ? (
            'loading'
          ) : error ? (
            'Something went wrong!'
          ) : (
            <div className='user'>
              <img src={data.img || '/img/noavatar.jpg'} alt='' />{' '}
              {/* User avatar */}
              <span>{data.username}</span> {/* User username */}
            </div>
          )}
          <p>{item.desc}</p> {/* Gig description */}
          <div className='star'>
            <img src='./img/star.png' alt='' /> {/* Star icon */}
            <span>
              {/* Calculate and display average star rating */}
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className='detail'>
          <img src='./img/heart.png' alt='' /> {/* Heart icon */}
          <div className='price'>
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2> {/* Gig price */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
