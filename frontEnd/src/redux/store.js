// store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './redusers/UsersReduser';
import postsReducer from './redusers/PostReduser';
import currentUserReducer from './redusers/UserReduser';

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    currentUser: currentUserReducer, // إضافة الريدويسر الجديد
  },
});

export default store;
