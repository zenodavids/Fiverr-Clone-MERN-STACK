import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Message.scss';

const Message = () => {
  const { id } = useParams(); // Get the conversation ID from the URL parameters.
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get the current user from local storage.

  const queryClient = useQueryClient(); // Initialize the QueryClient from react-query.

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'], // Define the query key.
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }), // Define the query function to fetch messages.
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']); // Invalidate the 'messages' query on successful mutation.
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    }); // Send a mutation to create a new message.
    e.target[0].value = ''; // Clear the textarea after sending the message.
  };

  return (
    <div className='message'>
      <div className='container'>
        <span className='breadcrumbs'>
          <Link to='/messages'>Messages</Link>
          {`> John Doe >`} {/* Display breadcrumbs */}
        </span>
        {isLoading ? (
          'loading'
        ) : error ? (
          'error'
        ) : (
          <div className='messages'>
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? 'owner item' : 'item'}
                key={m._id}
              >
                <img
                  src='https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600'
                  alt=''
                />
                <p>{m.desc}</p> {/* Display each message */}
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className='write' onSubmit={handleSubmit}>
          <textarea type='text' placeholder='write a message' />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
