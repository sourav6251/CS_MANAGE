import { createSlice } from "@reduxjs/toolkit";

// Get saved state from localStorage (if available)
const savedState = JSON.parse(localStorage.getItem("user")) || {};

const initialState = {
    isLogin: savedState.isLogin || false,
    role: savedState.role || "",
    department: savedState.department || "",
    departmentid: savedState.departmentid || "",
    username: savedState.username || "",
    userid: savedState.userid || "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginState: (state, action) => {
            state.isLogin = action.payload;
            localStorage.setItem("user", JSON.stringify(state));
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem("user", JSON.stringify(state));
        },
        setDepartment: (state, action) => {
            state.departmentid = action.payload.departmentid;  // Corrected this line
            state.department = action.payload.department;    // Added setting department as well
            localStorage.setItem("user", JSON.stringify(state));
        },
        setUser: (state, action) => {
            state.username = action.payload.username;  // Assuming action.payload contains username and userid
            state.userid = action.payload.userid;
            localStorage.setItem("user", JSON.stringify(state));
        },clearUser: (state) => {
            // Reset state to initial values
            state.isLogin = false;
            state.role = "";
            state.department = "";
            state.departmentid = "";
            state.username = "";
            state.userid = "";
            // Clear localStorage
            localStorage.removeItem("user");
          },
    },
});

export const { loginState, setRole, setDepartment, setUser,clearUser } = userSlice.actions;

export default userSlice.reducer;
