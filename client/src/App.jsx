import './app.scss'; // Import the CSS styles
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'; // Import routing components from react-router-dom
import React from 'react'; // Import React library
import Navbar from './components/navbar/Navbar'; // Import the Navbar component
import Footer from './components/footer/Footer'; // Import the Footer component
import Home from './pages/home/Home'; // Import the Home page component
import Gigs from './pages/gigs/Gigs'; // Import the Gigs page component
import Gig from './pages/gig/Gig'; // Import the Gig page component
import Login from './pages/login/Login'; // Import the Login page component
import Register from './pages/register/Register'; // Import the Register page component
import Add from './pages/add/Add'; // Import the Add page component
import Orders from './pages/orders/Orders'; // Import the Orders page component
import Messages from './pages/messages/Messages'; // Import the Messages page component
import Message from './pages/message/Message'; // Import the Message page component
import MyGigs from './pages/myGigs/MyGigs'; // Import the MyGigs page component
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import components from react-query library
import Success from './pages/success/Success'; // Import the Success page component
// import Pay from './pages/pay/Pay';

function App() {
  const queryClient = new QueryClient(); // Create a new QueryClient instance

  const Layout = () => {
    return (
      <div className='app'>
        {/* Provide the QueryClient to the components */}
        <QueryClientProvider client={queryClient}>
          <Navbar /> {/* Render the Navbar component */}
          <Outlet /> {/* Render the content of the active route */}
          <Footer /> {/* Render the Footer component */}
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/gigs',
          element: <Gigs />,
        },
        {
          path: '/myGigs',
          element: <MyGigs />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/messages',
          element: <Messages />,
        },
        {
          path: '/message/:id',
          element: <Message />,
        },
        {
          path: '/add',
          element: <Add />,
        },
        {
          path: '/gig/:id',
          element: <Gig />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        // {
        //   path: '/pay/:id',
        //   element: <Pay />,
        // },
        {
          path: '/success',
          element: <Success />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
