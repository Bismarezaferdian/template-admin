import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetch: false,
    error: false,
  },

  reducers: {
    //getProduct
    getOrderStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetch = false;
      state.error = false;
      state.orders = action.payload;
      // console.log(state.Orders);
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
      state.orders.slice(
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
      state.Orders[
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
