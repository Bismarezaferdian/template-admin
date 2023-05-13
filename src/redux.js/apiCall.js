import Order from "../pages/OrderList";
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
  // addCategoryFailure,
  // addCategoryStart,
  addCategorySuccess,
  categoryFailure,
  categoryStart,
  deleteCategorySuccess,
  // getCategoryFailure,
  // getCategoryStart,
  // deleteCategoryStart,
  // getCategoryFailure,
  // getCategoryStart,
  getCategorySuccess,
  updateCategorySuccess,
} from "./category";
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
  updateProductFailure,
  updateProductStart,
  updateStateSuccess,
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

export const deleteProduct = async (
  dispatch,
  id,
  navigate,
  successMessage,
  errorMassage
) => {
  dispatch(deleteProductStart());
  try {
    console.log(id);
    await fetchData.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
    successMessage("succes delete product !");
    navigate("/products");
  } catch (error) {
    dispatch(deleteProductFailure());
    errorMassage("failed delete product");
  }
};

export const updateProduct = async (
  dispatch,
  id,
  product,
  navigate,
  toast,
  errorMassage
) => {
  dispatch(updateProductStart());
  try {
    const data = await fetchData.put(`/products/update/${id}`, product);
    console.log(data);
    dispatch(updateStateSuccess(data));
    navigate("/products");
    toast.success("success update product!");
    // successMessage("succes add product !");
  } catch (error) {
    dispatch(updateProductFailure());
    errorMassage("failed add product !");
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
    console.log(product);
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
    console.log(res.data);
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

//category product

export const getCategory = async (dispatch) => {
  dispatch(categoryStart());
  try {
    const res = await fetchData.get("/catproducts");
    // dispatch(getOrderSuccess(res.data));
    dispatch(getCategorySuccess(res.data));

    console.log(res);
  } catch (error) {
    dispatch(categoryFailure());
    console.log(error);
  }
};

export const addCategory = async (dispatch, data, navigate, errorMassage) => {
  dispatch(categoryStart());
  try {
    const res = await fetchData.post("/catproducts", data);
    dispatch(addCategorySuccess(res.data));
    navigate("/category");
    console.log(res);
  } catch (error) {
    dispatch(categoryFailure());
    errorMassage("failed add category");
  }
};

export const updateCategory = async (dispatch, id, data, navigate) => {
  dispatch(categoryStart());
  try {
    const res = await fetchData.put(`/catproducts/${id}`, data);
    dispatch(updateCategorySuccess(res.data));
    console.log(res.data);
    navigate("/category");
  } catch (error) {
    dispatch(categoryFailure());
  }
};

export const deleteCategory = async (dispatch, id) => {
  dispatch(categoryStart());
  try {
    await fetchData.delete(`/catproducts/${id}`);
    dispatch(deleteCategorySuccess(id));
  } catch (error) {
    dispatch(categoryFailure());
  }
};
