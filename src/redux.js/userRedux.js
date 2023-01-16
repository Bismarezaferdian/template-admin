import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = { currentUser: null, isFetch: false, error: false };
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

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
