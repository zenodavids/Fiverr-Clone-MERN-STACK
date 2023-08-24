import React, { useState } from 'react'; // Import React and useState hook
import './Login.scss'; // Import the CSS styles for the component
import newRequest from '../../utils/newRequest'; // Import the utility function for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation

function Login() {
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(null); // State for error messages

  const navigate = useNavigate(); // Use the navigate function for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send a POST request to the '/auth/login' endpoint
      const res = await newRequest.post('/auth/login', { username, password });

      // Store the user data in local storage
      localStorage.setItem('currentUser', JSON.stringify(res.data));

      // Navigate to the home page
      navigate('/');
    } catch (err) {
      // Set the error state with the error message from the response
      setError(err.response.data);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor=''>Username</label>
        <input
          name='username'
          type='text'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor=''>Password</label>
        <input
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
        {/* Display the error message if available */}
        {error && console.log(error)}{' '}
      </form>
    </div>
  );
}

export default Login;
