import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
  name: "allUser",
  initialState: {
    allUsers: [],
    isFetch: false,
    error: false,
  },

  reducers: {
    //getProduct
    getAllUserStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    getAllUserSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.allUsers = action.payload;
      // console.log(state.allUsers);
    },
    getAllUserFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //deleteAllUser
    deleteAllUserStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    deleteAllUserSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.allUsers.slice(
        state.allUsers.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteAllUserFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //updateAllUser
    updateAllUserStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    updateAllUserSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.allUsers[
        state.allUsers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.AllUser;
    },
    updateAllUserFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //addAllUser
    addAllUserStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    addAllUserSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.allUsers.push(action.payload);
    },
    addAllUserFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
  },
});

export const {
  getAllUserStart,
  getAllUserSuccess,
  getAllUserFailure,
  deleteAllUserStart,
  deleteAllUserSuccess,
  deleteAllUserFailure,
  updateAllUserStart,
  updateAllUserSuccess,
  updateAllUserFailure,
  addAllUserStart,
  addAllUserSuccess,
  addAllUserFailure,
} = allUserSlice.actions;
export default allUserSlice.reducer;
