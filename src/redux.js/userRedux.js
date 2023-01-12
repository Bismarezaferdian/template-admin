import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetch: false,
    error: false,
  },

  reducers: {
    loginStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    loginSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetch = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
