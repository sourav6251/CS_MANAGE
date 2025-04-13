import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserState'

export const store = configureStore({
  reducer: {
    user:userReducer
  },
});
export default store;