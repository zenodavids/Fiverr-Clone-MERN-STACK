import React, { useState } from 'react';
import './Featured.scss';
import { useNavigate } from 'react-router-dom';

// Define a functional component called Featured
function Featured() {
  // Use the useState hook to manage the input state
  const [input, setInput] = useState('');

  // Get the navigation function using the useNavigate hook
  const navigate = useNavigate();

  // Define a function to handle the form submission
  const handleSubmit = () => {
    // Redirect to the "gigs" page with a search query
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className='featured'>
      <div className='container'>
        <div className='left'>
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className='search'>
            <div className='searchInput'>
              <img src='./img/search.png' alt='' />
              {/* Input field with placeholder text */}
              <input
                type='text'
                placeholder='Try "building mobile app"'
                // Handle input change and update the input state
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {/* Button to trigger the search */}
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className='popular'>
            <span>Popular:</span>
            {/* Buttons for popular categories */}
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className='right'>
          {/* Display an image */}
          <img src='./img/man.png' alt='' />
        </div>
      </div>
    </div>
  );
}

// Export the Featured component
export default Featured;
