import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.scss";
import { fetchData } from "../../useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux.js/apiCall";
import { errorMessage, successMessage } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

function NewProduct({ inputs, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetch } = useSelector((state) => state.product);
  //LOCAL STATE
  const [imgDetail, setImgDetail] = useState([]);
  const [imgDisplay, setImgDisplay] = useState("");
  //send data base
  const [dataProduct, setDataProduct] = useState({
    title: "",
    stock: "",
    price: "",
    desc: "",
  });
  const [categories, setCategories] = useState([]);
  //send databse
  const [dataCat, setDataCat] = useState([]);
  const [newData, setNewData] = useState("");
  //send database
  const [data, setData] = useState({
    color: ["red"],
    size: [],
  });

  const [validate, setValidate] = useState(false);

  // console.log(dataProduct);
  const lowerCase = (string) => {
    return string.toLowerCase();
  };

  useEffect(() => {
    const getCat = async () => {
      const res = await fetchData.get(
        `${process.env.REACT_APP_HOST}/api/v1/catproducts/`
      );
      setCategories(res.data);
    };
    getCat();
  }, [location.pathname]);

  const handleChange = (e) =>
    setDataProduct((prev) => ({
      ...prev,
      [e.target.id]: lowerCase(e.target.value),
    }));

  const handleSelect = (e) => {
    const { value } = e.target;
    if (dataCat.includes(value)) {
      setDataCat(dataCat.filter((cat) => cat !== value));
    } else {
      setDataCat([...dataCat, value]);
    }
  };

  const handleChangeNewData = (e) =>
    setNewData((prev) => ({
      ...prev,
      //e.target.id pakai squence brackets karna berisi variable
      [e.target.id]: e.target.value,
    }));

  const handleAdd = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    // newData[name] mengunakan squence bracket karna name adalah variable
    const newDatas = newData[name];
    if (newDatas && !data[name].includes(newDatas)) {
      // if (newDatas && !data[name].includes(newDatas)) {
      setData((prevData) => ({
        ...prevData,
        [name]: [...prevData[name], newDatas],
      }));
    }
    setNewData("");
  };

  const handleDelete = (e, i) => {
    const name = e.target.getAttribute("name");
    console.log(name);
    const datas = { ...data };
    datas[name].splice(i, 1);
    setData(datas);
  };

  const deleteImg = (e, index) => {
    e.preventDefault();
    setImgDetail((prevImgDetail) => {
      //imgDetail di jadikan array
      const arrPrevImgDetail = Array.from(prevImgDetail);
      const newArrPrevImgDetail = arrPrevImgDetail.filter(
        (_, i) => i !== index
      );
      return newArrPrevImgDetail;
    });
  };

  const runValidate = () => {
    setValidate(true);
  };
  console.log(dataProduct);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, stock, price } = dataProduct;
    if (
      !title ||
      !description ||
      !stock ||
      !price ||
      !imgDisplay ||
      !imgDetail.length ||
      !data.size.length ||
      !data.color.length
    ) {
      runValidate();
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("imgDisplay", imgDisplay);
    for (let i = 0; i < imgDetail.length; i++) {
      formData.append("imgDetail", imgDetail[i]);
    }
    formData.append("categories", dataCat);
    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("stock", stock);
    formData.append("price", price);
    // formData.append("title", "title");

    console.log(formData);
    await addProduct(
      dispatch,
      formData,
      navigate,
      successMessage,
      errorMessage
    );
  };

  //old version

  //   const addSize = (e) => {
  //     console.log(e.target.getAttribute("name"));

  //     e.preventDefault();
  //     size.includes(newSize) ? setSize(size) : setSize([...size, newSize]);
  //     setNewSize("");
  //   };
  //   const addColor = (e) => {
  //     e.preventDefault();
  //     color.includes(newColor) ? setColor(color) : setColor([...color, newColor]);
  //     setNewColor("");
  //   };

  //   const handleDeleteSize = (i) => {
  //     const newSize = [...size];
  //     newSize.splice(i, 1);
  //     setSize(newSize);
  //   };
  //   const handleDeleteColor = (i) => {
  //     console.log("delete");
  //     const newColor = [...color];
  //     newColor.splice(i, 1);
  //     setColor(newColor);
  //   };
  //   console.log(`color :${color} `);
  //   console.log(`newColor :${newColor} `);

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
          <div className="right">
            <form encType="multipart/form-data">
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    onChange={handleChange}
                    value={dataProduct[input.id]}
                    // placeholder={
                    //   (productUpdate && productUpdate[input.id]) ||
                    //   input.placeholder
                    // }
                  />
                  {!dataProduct[input.id] && validate && (
                    <span>tidak boleh kosong </span>
                  )}
                </div>
              ))}

              <div className="formInput">
                <label htmlFor="file">
                  Image Display:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setImgDisplay(e.target.files[0])}
                  style={{ display: "none" }}
                />
                {!imgDisplay && validate && <span>tidak boleh kosong </span>}
                {imgDisplay && (
                  <div>
                    <img
                      src={
                        imgDisplay
                          ? URL.createObjectURL(imgDisplay)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <div
                      className="iconClose"
                      onClick={() => setImgDisplay("")}
                    >
                      <CloseIcon fontSize="small" />
                    </div>
                  </div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="files">
                  Image Detail:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="files"
                  multiple
                  accept=".jpg,image/*,.png,.jpeg"
                  // onChange={(e) => console.log(e.target.files)}
                  onChange={(e) => setImgDetail(e.target.files)}
                  style={{ display: "none" }}
                />
                {!imgDetail.length && validate && (
                  <span>tidak boleh kosong </span>
                )}
                {imgDetail &&
                  Array.from(imgDetail).map((item, index) => (
                    <div className="imgWrapp" key={index}>
                      <img
                        src={
                          item
                            ? URL.createObjectURL(item)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                      <div
                        className="iconClose"
                        onClick={(e) => deleteImg(e, index)}
                      >
                        <CloseIcon fontSize="small" />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="formInput1">
                <label>Desc</label>
                <textarea
                  rows="4"
                  cols="80"
                  id="description"
                  // value={
                  //   productUpdate
                  //     ? productUpdate.desc
                  //     : setDataProduct.description
                  // }
                  onChange={(e) => handleChange(e)}
                />
                {!dataProduct.description && validate && (
                  <span>tidak boleh kosong </span>
                )}
              </div>

              {/* size */}
              <div className="formInput1">
                <label>Size :</label>
                {data.size.map((item, i) => (
                  <div className="sizeWrapp" key={i}>
                    <p>{item.toUpperCase()}</p>
                    <div
                      name="size"
                      className="btn"
                      onClick={(e) => handleDelete(e, i)}
                    >
                      cancel
                    </div>
                  </div>
                ))}
                <div className="inputWrapp">
                  <input
                    id="size"
                    type="text"
                    value={newData.size || ""}
                    onChange={(e) => handleChangeNewData(e)}
                    // onChange={(e) => setNewSize(e.target.value)}
                  />
                  <div
                    name="size"
                    className="buttonColor"
                    onClick={(e) => handleAdd(e)}
                  >
                    Add
                  </div>
                </div>
                {!data.size.length && validate && (
                  <span>size belum ditambahkan </span>
                )}
              </div>

              {/* color */}
              <div className="formInput1">
                <label>Color :</label>
                {data.color.map((item, i) => (
                  <div className="sizeWrapp" key={i}>
                    <p>{item}</p>
                    <div
                      name="color"
                      className="btn"
                      onClick={(e) => handleDelete(e, i)}
                    >
                      cancel
                    </div>
                  </div>
                ))}
                <div className="inputWrapp">
                  <input
                    id="color"
                    type="text"
                    value={newData.color || ""}
                    onChange={(e) => handleChangeNewData(e)}
                    // onChange={(e) => setNewColor(e.target.value)}
                  />
                  <div
                    name="color"
                    className="buttonColor"
                    onClick={(e) => handleAdd(e)}
                  >
                    Add
                  </div>
                </div>
                {!data.color.length && validate && (
                  <span>color belum ditambahkan </span>
                )}
              </div>

              {/* categorie */}
              <div className="formInput1">
                <div className="categorieWrapp"></div>
                <label>Pilih Categorie :</label>
                <div className="checkbox">
                  {categories.map((cat, i) => (
                    <label key={i}>
                      <input
                        type="checkbox"
                        // key={i}
                        value={cat._id}
                        onChange={handleSelect}
                        checked={dataCat.includes(cat._id)}
                      />
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </label>
                  ))}
                </div>
                {!dataCat.length && validate && (
                  <span>categorie belum di pilih </span>
                )}
              </div>
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

export default NewProduct;
