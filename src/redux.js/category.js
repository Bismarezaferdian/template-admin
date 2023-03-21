import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = { categories: [], isFetch: false, error: false };
const categoriesSlice = createSlice({
  name: "categorie",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    categoryStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },

    getCategorySuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.categories = action.payload;
      // console.log(state.allUsers);
    },
    // getCategoryFailure: (state) => {
    //   state.isFetch = false;
    //   state.error = true;
    // },

    //delete  category
    // deleteCategoryStart: (state) => {
    //   state.error = false;
    //   state.isFetch = true;
    // },
    deleteCategorySuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.categories.splice(
        state.categories.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    // deleteCategoryFailure: (state) => {
    //   state.isFetch = false;
    //   state.error = true;
    // },

    //update category
    // updateCategoryStart: (state) => {
    //   state.error = false;
    //   state.isFetch = true;
    // },

    updateCategorySuccess: (state, action) => {
      console.log(action);
      state.isFetch = false;
      state.error = false;
      state.categories[
        state.categories.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.categories;
    },

    // updateCategoryFailure: (state) => {
    //   state.isFetch = false;
    //   state.error = true;
    // },

    //add category
    // addCategoryStart: (state) => {
    //   state.error = false;
    //   state.isFetch = true;
    // },
    // addCategoryStart: (state) => {
    //   state.error = false;
    //   state.isFetch = true;
    // },

    addCategorySuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.categories.push(action.payload);
    },

    categoryFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
  },
});

export const {
  categoryStart,
  getCategorySuccess,
  // getCategoryFailure,
  //   deleteCategoryStart,
  deleteCategorySuccess,
  //   deleteCategoryFailure,
  //   updateCategoryStart,
  updateCategorySuccess,
  // addCategoryStart,
  addCategorySuccess,
  // addCategoryFailure,
  categoryFailure,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
