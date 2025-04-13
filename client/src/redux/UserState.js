import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  role: ''
};

const UserStateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logoutUser: (state) => {
      state.isLogin = false;
      state.role = '';
    }
  }
});

export const { setLogin, setRole, logoutUser } = UserStateSlice.actions;
export default UserStateSlice.reducer;