// Define a utility function to create custom error objects
const createError = (status, message) => {
  // Create a new Error instance
  const err = new Error();

  // Set the status and message properties of the error
  err.status = status;
  err.message = message;

  // Return the custom error object
  return err;
};

// Export the createError function to be used in other parts of the application
export default createError;
