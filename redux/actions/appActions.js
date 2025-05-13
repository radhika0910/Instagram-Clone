// Path: redux\actions\appActions.js
import { SET_POSTS, SET_PROFILE_PICTURE, SET_STORIES, SET_VIDEOS } from '../reducers/appReducer';

import { SET_GRID_IMAGES } from '../reducers/appReducer';

export const setGridImages = (gridImages) => ({
  type: SET_GRID_IMAGES,
  payload: gridImages,
});

export const setProfilePicture = (profilePicture) => ({
  type: SET_PROFILE_PICTURE,
  payload: profilePicture,
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

export const setVideos = (videos) => ({
  type: SET_VIDEOS,
  payload: videos,
});
export const setStories = (stories) => ({
  type: SET_STORIES,
  payload: stories,
});

