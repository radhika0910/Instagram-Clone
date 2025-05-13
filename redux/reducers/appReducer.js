// Path: app\reducers\appReducer.js
const initialState = {
  profilePicture: '',
  posts: [],
  videos: [], // Add videos state
};

// Action types
export const SET_PROFILE_PICTURE = 'SET_PROFILE_PICTURE';
export const SET_POSTS = 'SET_POSTS';
export const SET_VIDEOS = 'SET_VIDEOS'; // Add action type for videos

// Reducer
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
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
    default:
      return state;
  }
};

export default appReducer;