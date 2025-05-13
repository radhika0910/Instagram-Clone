// Path: redux\reducers\appReducer.js
const initialState = {
  profilePicture: '',
  posts: [],
  videos: [],
  stories: [], 
  gridImages: [],
};

// Action types
export const SET_PROFILE_PICTURE = 'SET_PROFILE_PICTURE';
export const SET_POSTS = 'SET_POSTS';
export const SET_VIDEOS = 'SET_VIDEOS';
export const SET_STORIES = 'SET_STORIES'; 
export const SET_GRID_IMAGES = 'SET_GRID_IMAGES'; 

// Reducer
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
       case SET_GRID_IMAGES:
      return {
        ...state,
        gridImages: action.payload,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case SET_STORIES: // Handle stories action
      return {
        ...state,
        stories: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;