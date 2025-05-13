// Path: redux\store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import appReducer from './reducers/appReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;