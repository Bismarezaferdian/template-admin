import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = { products: [], isFetch: false, error: false };
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    //getProduct
    getProductStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //deleteProduct
    deleteProductStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //updateProduct
    updateProductStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    updateStateSuccess: (state, action) => {
      console.log(action.payload);
      state.isFetch = false;
      state.error = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //addProduct
    addProductStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },

    addProductSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateStateSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
