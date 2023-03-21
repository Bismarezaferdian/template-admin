import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation, Await } from "react-router-dom";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addProduct } from "../../redux.js/apiCall";
import { errorMessage, successMessage } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
// import { addCategoriesProducts } from "../../../../api/controller/categoriesProductsContoller.";

function NewCategory({ title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetch } = useSelector((state) => state.product);
  //LOCAL STATE
  const [categoryProduct, setCategoryProduct] = useState("");
  //send data base
  const [validate, setValidate] = useState(false);

  // console.log(dataProduct);
  const lowerCase = (string) => {
    return string.toLowerCase();
  };

  const runValidate = () => {
    setValidate(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCategory(
        dispatch,
        { name: categoryProduct },
        navigate,
        errorMessage
      );
    } catch (error) {
      errorMessage("failed add category");
    }
  };

  //HANDLE IMAGE
  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title} </h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
          </div>
          <div className="right" style={{ display: "flex" }}>
            <form encType="multipart/form-data">
              <div className="formInput">
                <label>Name Category</label>

                <input
                  id="category"
                  type="text"
                  onChange={(e) => setCategoryProduct(e.target.value)}
                  placeholder="category baru"
                />
              </div>
              {/* {!dataProduct[input.id] && validate && (
                  <span>tidak boleh kosong </span>
              </div> */}
              {/* categorie */}
              <button disabled={isFetch} onClick={(e) => handleSubmit(e)}>
                Add Data
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCategory;
