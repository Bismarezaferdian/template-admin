import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = { orders: [], isFetch: false, error: false };
const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    //getProduct
    getOrderStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    getOrderSuccess: (state, action) => {
      console.log(action);
      state.isFetch = false;
      state.error = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //deleteOrder
    deleteOrderStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteOrderFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //updateOrder
    updateOrderStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.orders[
        state.orders.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.Order;
    },
    updateOrderFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    //addOrder
    addOrderStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    addOrderSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.orders.push(action.payload);
    },
    addOrderFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
} = orderSlice.actions;
export default orderSlice.reducer;
