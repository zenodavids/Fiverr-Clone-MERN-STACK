import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'https://fiverr-clone-0rpr.onrender.com',
  withCredentials: true,
});

export default newRequest;
