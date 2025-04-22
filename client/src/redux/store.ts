
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import dashboardReducer from './dashboardSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
