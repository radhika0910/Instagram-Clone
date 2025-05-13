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
    fetchVideos: builder.query({
      query: () =>
        'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json',
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchProfilePictureQuery,
  useFetchStoriesQuery,
  useFetchVideosQuery,
} = apiSlice;