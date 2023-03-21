import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.scss";
import { fetchData } from "../../useFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateCategory,
  updateProduct,
} from "../../redux.js/apiCall";
import { errorMessage, successMessage } from "../../utils/Toastify";
import { toast, ToastContainer } from "react-toastify";

function UpdateCategory({ inputs, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;
  const dispatch = useDispatch();
  const { categories, isFetch } = useSelector((state) => state.categorie);
  const [dataCategorie, setDataCategorie] = useState({
    name: "",
  });
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    if (id) {
      const categorieProduct = categories.find((item) => item._id === id);

      setDataCategorie(categorieProduct);
    }
  }, [categories, id]);

  const handleChange = (e) => {
    console.log(e.target.id);
    setDataCategorie((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  console.log(dataCategorie);

  const runValidate = () => {
    setValidate(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!dataCategorie.name) {
      runValidate();
    }

    updateCategory(dispatch, id, dataCategorie, navigate);
  };

  return (
    <div className="new">
      {/* <ToastContainer /> */}
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
          <div className="right">
            <form encType="multipart/form-data">
              <div className="formInput">
                <label>Name Category</label>
                <input
                  id="name"
                  type="text"
                  onChange={handleChange}
                  value={dataCategorie.name}
                />
                {!dataCategorie.name && validate && (
                  <span>tidak boleh kosong </span>
                )}
              </div>

              <button disabled={isFetch} onClick={(e) => handleUpdate(e)}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;
