// Path: redux\api\apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://boringapi.com/api/v1/' }),
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => 'photos/random?num=10',
    }),
    fetchProfilePicture: builder.query({
      query: () => 'photos/random?num=1',
    }),
    fetchStories: builder.query({
      query: (num = 12) => `photos/random?num=${num}`,
    }),
   
    fetchPostImage: builder.query({
      query: () => 'photos/random?num=1',
    }),
    fetchAvatarImage: builder.query({
      query: () => 'photos/random?num=1',
    }),
    fetchGridImages: builder.query({
      query: () => 'photos/random?num=6', 
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchProfilePictureQuery,
  useFetchStoriesQuery,
  // useFetchVideosQuery,
  useFetchPostImageQuery,
  useFetchAvatarImageQuery,
  useFetchGridImagesQuery,
} = apiSlice;