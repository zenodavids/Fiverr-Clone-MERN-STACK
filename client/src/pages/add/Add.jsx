import React, { useReducer, useState } from 'react';
import './Add.scss';
import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer';
import upload from '../../utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

// Define the Add component
const Add = () => {
  // State for file uploads
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Use gigReducer for state management
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // Handle input changes for gig information
  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // Handle adding features to the gig
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_FEATURE',
      payload: e.target[0].value,
    });
    e.target[0].value = '';
  };

  // Handle file upload
  const handleUpload = async () => {
    setUploading(true);
    try {
      // Upload cover image
      const cover = await upload(singleFile);

      // Upload additional images
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      // Update state with uploaded images
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(state);

  // Navigation and query client
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Use mutation for submitting gig data
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post('/gigs', gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    console.log(handleSubmit); // navigate("/mygigs")
  };

  return (
    <div className='add'>
      <div className='container'>
        <h1>Add New Gig</h1>
        {/* Form sections */}
        <div className='sections'>
          {/* Gig information */}
          <div className='info'>
            {/* Title */}
            <label htmlFor=''>Title</label>
            <input
              type='text'
              name='title'
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            {/* Category */}
            <label htmlFor=''>Category</label>
            <select name='cat' id='cat' onChange={handleChange}>
              <option value='design'>Design</option>
              <option value='web'>Web Development</option>
              <option value='animation'>Animation</option>
              <option value='music'>Music</option>
            </select>
            {/* Images */}
            <div className='images'>
              <div className='imagesInputs'>
                {/* Cover Image */}
                <label htmlFor=''>Cover Image</label>
                <input
                  type='file'
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                {/* Upload Images */}
                <label htmlFor=''>Upload Images</label>
                <input
                  type='file'
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? 'uploading' : 'Upload'}
              </button>
            </div>
            {/* Description */}
            <label htmlFor=''>Description</label>
            <textarea
              name='desc'
              id=''
              placeholder='Brief descriptions to introduce your service to customers'
              cols='0'
              rows='16'
              onChange={handleChange}
            ></textarea>
            {/* Submit button */}
            <button onClick={handleSubmit}>Create</button>
          </div>
          {/* Gig details */}
          <div className='details'>
            {/* Service Title */}
            <label htmlFor=''>Service Title</label>
            <input
              type='text'
              name='shortTitle'
              placeholder='e.g. One-page web design'
              onChange={handleChange}
            />
            {/* Short Description */}
            <label htmlFor=''>Short Description</label>
            <textarea
              name='shortDesc'
              onChange={handleChange}
              id=''
              placeholder='Short description of your service'
              cols='30'
              rows='10'
            ></textarea>
            {/* Delivery Time */}
            <label htmlFor=''>Delivery Time (e.g. 3 days)</label>
            <input type='number' name='deliveryTime' onChange={handleChange} />
            {/* Revision Number */}
            <label htmlFor=''>Revision Number</label>
            <input
              type='number'
              name='revisionNumber'
              onChange={handleChange}
            />
            {/* Add Features */}
            <label htmlFor=''>Add Features</label>
            <form action='' className='add' onSubmit={handleFeature}>
              <input type='text' placeholder='e.g. page design' />
              <button type='submit'>add</button>
            </form>
            {/* Added Features */}
            <div className='addedFeatures'>
              {state?.features?.map((f) => (
                <div className='item' key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FEATURE', payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            {/* Price */}
            <label htmlFor=''>Price</label>
            <input type='number' onChange={handleChange} name='price' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
