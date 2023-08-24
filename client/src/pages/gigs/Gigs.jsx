import React, { useEffect, useRef, useState } from 'react';
import './Gigs.scss'; // Import the component's CSS styles
import GigCard from '../../components/gigCard/GigCard'; // Import the GigCard component
import { useQuery } from '@tanstack/react-query'; // Import the useQuery hook from react-query
import newRequest from '../../utils/newRequest'; // Import a utility for making API requests
import { useLocation } from 'react-router-dom'; // Import the useLocation hook from react-router-dom

function Gigs() {
  // State and refs to manage sorting and filtering
  const [sort, setSort] = useState('sales');
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  // Get the current search location from the URL
  const { search } = useLocation();

  // Fetch gig data using useQuery
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'], // Unique query key
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  // Log the fetched data
  console.log(data);

  // Function to re-sort the gig list
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  // Refetch data when sort changes
  useEffect(() => {
    refetch();
  }, [sort]);

  // Function to apply filters
  const apply = () => {
    refetch();
  };

  return (
    <div className='gigs'>
      <div className='container'>
        {/* Breadcrumbs and page title */}
        <span className='breadcrumbs'>{`Liverr > Graphics & Design >`}</span>
        <h1>AI Artists</h1>
        <p>
          {
            " Explore the boundaries of art and technology with Liverr's AI artists"
          }
        </p>
        {/* Filter and sort menu */}
        <div className='menu'>
          <div className='left'>
            <span>Budget</span>
            <input ref={minRef} type='number' placeholder='min' />
            <input ref={maxRef} type='number' placeholder='max' />
            <button onClick={apply}>Apply</button>
          </div>
          <div className='right'>
            <span className='sortBy'>Sort by</span>
            <span className='sortType'>
              {sort === 'sales' ? 'Best Selling' : 'Newest'}
            </span>
            <img src='./img/down.png' alt='' onClick={() => setOpen(!open)} />
            {open && (
              <div className='rightMenu'>
                {/* Options for re-sorting */}
                {sort === 'sales' ? (
                  <span onClick={() => reSort('createdAt')}>Newest</span>
                ) : (
                  <span onClick={() => reSort('sales')}>Best Selling</span>
                )}
                <span onClick={() => reSort('sales')}>Popular</span>
              </div>
            )}
          </div>
        </div>
        {/* Display gig cards */}
        <div className='cards'>
          {isLoading
            ? 'loading'
            : error
            ? 'Something went wrong!'
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
