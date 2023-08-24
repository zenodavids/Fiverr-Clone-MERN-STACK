import React, { useState } from 'react'; // Import React and useState hook
import upload from '../../utils/upload'; // Import the upload utility function
import './Register.scss'; // Import the CSS styles for the component
import newRequest from '../../utils/newRequest'; // Import the utility function for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation

function Register() {
  const [file, setFile] = useState(null); // State for profile picture file
  const [user, setUser] = useState({
    // State for user input fields
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
    // gender: include transgender too
  });

  const navigate = useNavigate(); // Use the navigate function for navigation

  const handleChange = (e) => {
    // Event handler for input changes
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    // Event handler for seller toggle
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    // Event handler for form submission
    e.preventDefault(); // Prevent default form submission behavior

    // Upload the profile picture and get the URL
    const url = await upload(file);

    try {
      // Send a POST request to the '/auth/register' endpoint
      await newRequest.post('/auth/register', {
        ...user,
        img: url,
      });

      // Navigate to the home page
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <div className='left'>
          <h1>Create a new account</h1>
          <label htmlFor=''>Username</label>
          <input
            name='username'
            type='text'
            placeholder='username'
            onChange={handleChange}
          />
          <label htmlFor=''>Email</label>
          <input
            name='email'
            type='email'
            placeholder='email'
            onChange={handleChange}
          />
          <label htmlFor=''>Password</label>
          <input name='password' type='password' onChange={handleChange} />
          <label htmlFor=''>Profile Picture</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor=''>Country</label>
          <input
            name='country'
            type='text'
            placeholder='Usa'
            onChange={handleChange}
          />
          <button type='submit'>Register</button>
        </div>
        <div className='right'>
          <h1>I want to become a seller</h1>
          <div className='toggle'>
            <label htmlFor=''>Activate the seller account</label>
            <label className='switch'>
              <input type='checkbox' onChange={handleSeller} />
              <span className='slider round'></span>
            </label>
          </div>
          <label htmlFor=''>Phone Number</label>
          <input
            name='phone'
            type='text'
            placeholder='+1 234 567 89'
            onChange={handleChange}
          />
          <label htmlFor=''>Description</label>
          <textarea
            placeholder='A short description of yourself'
            name='desc'
            id=''
            cols='30'
            rows='10'
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
