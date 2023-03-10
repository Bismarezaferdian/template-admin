import { fetchData, fetchUser } from "../useFetch";
import {
  addAllUserFailure,
  addAllUserStart,
  addAllUserSuccess,
  deleteAllUserFailure,
  deleteAllUserStart,
  deleteAllUserSuccess,
  getAllUserFailure,
  getAllUserStart,
  getAllUserSuccess,
  updateAllUserFailure,
  updateAllUserStart,
  updateAllUserSuccess,
} from "./allUserRedux";
import {
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from "./orderRedux";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductStart,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

//login
export const login = async (dispatch, user) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const res = await fetchData.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

//product
export const getProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await fetchData.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await fetchData.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, id) => {
  dispatch(updateProductStart());
  try {
    await fetchData.delete(`/products/update/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const addProduct = async (
  dispatch,
  product,
  navigate,
  successMessage,
  errorMassage
) => {
  dispatch(addProductStart());
  try {
    const res = await fetchData.post("/products", product);
    dispatch(addProductSuccess(res.data));
    navigate("/products");
    successMessage("succes add product !");
  } catch (error) {
    dispatch(addProductFailure());
    errorMassage("failed add product !");
  }
};

//user
export const getAllUser = async (dispatch) => {
  dispatch(getAllUserStart());
  try {
    const res = await fetchData.get("/users");
    // console.log(res.data);
    dispatch(getAllUserSuccess(res.data));
  } catch (error) {
    dispatch(getAllUserFailure());
  }
};

export const deleteAllUser = async (dispatch, id) => {
  dispatch(deleteAllUserStart());
  try {
    await fetchData.delete(`/users/${id}`);
    dispatch(deleteAllUserSuccess(id));
  } catch (error) {
    dispatch(deleteAllUserFailure());
  }
};

export const updateAllUser = async (dispatch, id) => {
  dispatch(updateAllUserStart());
  try {
    await fetchData.delete(`/users/update/${id}`);
    dispatch(updateAllUserSuccess(id));
  } catch (error) {
    dispatch(updateAllUserFailure());
  }
};

export const addAllUser = async (dispatch, AllUser) => {
  dispatch(addAllUserStart());
  try {
    const res = await fetchData.post("/auth/register", AllUser);
    dispatch(addAllUserSuccess(res.data));
  } catch (error) {
    dispatch(addAllUserFailure());
  }
};

//order

export const getOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await fetchData.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (error) {
    dispatch(getOrderFailure());
  }
};

export const deleteOrder = async (dispatch, id) => {
  dispatch(deleteOrderStart());
  try {
    await fetchData.delete(`/orders/delete/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (error) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (dispatch, id) => {
  dispatch(updateOrderStart());
  try {
    await fetchData.delete(`/orders/update/${id}`);
    dispatch(updateOrderSuccess(id));
  } catch (error) {
    dispatch(updateOrderFailure());
  }
};

export const addOrder = async (dispatch, Order) => {
  dispatch(addOrderStart());
  try {
    const res = await fetchData.post("/orders", Order);
    dispatch(addOrderSuccess(res.data));
  } catch (error) {
    dispatch(addOrderFailure());
  }
};
