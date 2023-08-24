// Initial state for the gig creation form
export const INITIAL_STATE = {
  // Initialize userId from local storage if currentUser is available
  userId: JSON.parse(localStorage.getItem('currentUser'))?._id,
  title: '',
  cat: '',
  cover: '',
  images: [],
  desc: '',
  shortTitle: '',
  shortDesc: '',
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

// Reducer function for managing the state of the gig creation form
export const gigReducer = (state, action) => {
  switch (action.type) {
    // Handle changing input values in the form
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    // Handle adding cover image and additional images
    case 'ADD_IMAGES':
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    // Handle adding a feature to the gig
    case 'ADD_FEATURE':
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    // Handle removing a feature from the gig
    case 'REMOVE_FEATURE':
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };
    // Default case: return the current state if no action matches
    default:
      return state;
  }
};
