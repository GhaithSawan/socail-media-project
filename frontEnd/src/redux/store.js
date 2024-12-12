// store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/usersSlice';
import postsReducer from './features/postsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

export default store;
