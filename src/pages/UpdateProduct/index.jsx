import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.scss";
import { fetchData } from "../../useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux.js/apiCall";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../utils/Toastify";
import { toast, ToastContainer } from "react-toastify";

function UpdateProduct({ inputs, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const dispatch = useDispatch();
  const { products, isFetch } = useSelector((state) => state.product);
  // const [productUpdate, setProductUpdate] = useState(undefined);
  // console.log(productUpdate);
  //LOCAL STATE
  const [imgDetail, setImgDetail] = useState([]);
  const [imgDisplay, setImgDisplay] = useState("");
  //send data base
  const [dataProduct, setDataProduct] = useState({
    title: "",
    price: "",
    stock: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  //send databse
  const [dataCat, setDataCat] = useState([]);
  // console.log(dataProduct);
  // const [newData, setNewData] = useState("");
  // //send database
  // const [data, setData] = useState({
  //   color: ["red"],
  //   size: [],
  // });
  const [tempValue, setTempValue] = useState({
    color: {},
    size: {},
  });
  const [newColor, setNewColor] = useState([]);
  const [newSize, setNewSize] = useState([]);
  const [id, setId] = useState();

  const [validate, setValidate] = useState(false);

  const lowerCase = (string) => {
    return string.toLowerCase();
  };

  // useEffect(() => {
  //   if (product?.id) {
  //     const prod = products.find((products) => products._id === product.id);
  //     setId(prod._id);
  //     console.log(prod);
  //     // setProductUpdate(prod);
  //     // setTempValue((prev) => ({
  //     //   ...prev,
  //     //   size: [...prod.size],
  //     //   color: [...prod.color],
  //     // }));
  //     setNewColor(prod.color);
  //     setNewSize(prod.size);
  //     // setImgDetail((prev) => [...prev, prod.imgDetail]);

  //     const checked = [];
  //     prod?.categories?.map((item) => checked.push(item._id));
  //     setDataCat(checked);
  //     setDataProduct((prev) => ({
  //       ...prev,
  //       title: prod.title,
  //       price: prod.price,
  //       stock: prod.stock,
  //       description: prod.desc,
  //     }));
  //   }
  // }, [product?.id, products]);
  useEffect(() => {
    const prod = products.find((item) => item._id === product?.id);
    if (prod) {
      setId(prod._id);
      setNewColor(prod.color);
      setNewSize(prod.size);
      setDataCat(prod.categories.map((item) => item._id));
      setDataProduct({
        title: prod.title,
        price: prod.price,
        stock: prod.stock,
        description: prod.desc,
      });
    }
  }, [product?.id, products]);

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

  // const handleChangeNewData = (e) =>
  //   setNewData((prev) => ({
  //     ...prev,
  //     //e.target.id pakai squence brackets karna berisi variable
  //     [e.target.id]: e.target.value,
  //   }));

  const handleValueChange = (event) => {
    const { id, name, value } = event.target;
    setTempValue((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[event.target.id],
        [name]: value,
      },
    }));
  };

  // const handleAdd = (e) => {
  //   e.preventDefault();
  //   const name = e.target.getAttribute("name");
  //   // newData[name] mengunakan squence bracket karna name adalah variable
  //   const newDatas = newData[name];
  //   if (newDatas && !data[name].includes(newDatas)) {
  //     // if (newDatas && !data[name].includes(newDatas)) {
  //     setData((prevData) => ({
  //       ...prevData,
  //       [name]: [...prevData[name], newDatas],
  //     }));
  //   }
  //   setNewData("");
  // };
  const handleAdd = (e) => {
    const name = e.target.id;
    console.log(name);
    e.preventDefault();
    if (name === "color") {
      const arrName = [];
      newColor.map((item) => arrName.push(item.name));
      if (!arrName.includes(tempValue.color.name)) {
        setNewColor([...newColor, tempValue.color]);
      } else {
        infoMessage("color is aviable !");
      }
      setTempValue((prevState) => ({
        ...prevState,
        color: {},
      }));
    } else if (name === "size") {
      const arrName = [];
      newSize.map((item) => arrName.push(item.name));
      if (!arrName.includes(tempValue.size.name)) {
        setNewSize([...newSize, tempValue.size]);
      } else {
        infoMessage("color is aviable !");
      }
      setTempValue((prevState) => ({
        ...prevState,
        size: {},
      }));
    }
  };

  // const handleDelete = (e, i) => {
  //   const name = e.target.getAttribute("name");
  //   const datas = { ...data };
  //   datas[name].splice(i, 1);
  //   setData(datas);
  // };
  const handleDelete = (e, i) => {
    const name = e.target.getAttribute("name");
    if (name === "color") {
      const datas = [...newColor];
      datas.splice(i, 1);
      setNewColor(datas);
    } else if (name === "size") {
      const datas = [...newSize];
      datas.splice(i, 1);
      setNewSize(datas);
    }
  };

  const runValidate = () => {
    setValidate(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { title, description, stock, price } = dataProduct;
    if (
      !title ||
      !description ||
      !stock ||
      !price
      // !data.size.length ||
      // !data.color.length
    ) {
      runValidate();
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    if (imgDetail) {
      for (let i = 0; i < imgDetail.length; i++) {
        formData.append("imgDetail", imgDetail[i]);
      }
    }
    if (imgDisplay) {
      formData.append("imgDisplay", imgDisplay);
    }
    formData.append("categories", dataCat);
    formData.append("size", JSON.stringify(newSize));
    formData.append("color", JSON.stringify(newColor));
    formData.append("stock", stock);
    formData.append("price", price);

    await updateProduct(dispatch, id, formData, navigate, toast, errorMessage);
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
                {/* {!imgDisplay && validate && <span>tidak boleh kosong </span>} */}
                {imgDisplay && (
                  <img
                    src={
                      imgDisplay
                        ? URL.createObjectURL(imgDisplay)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
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
                {/* {!imgDetail.length && validate && (
                  <span>tidak boleh kosong </span>
                )} */}
                {imgDetail &&
                  Array.from(imgDetail).map((item, index) => (
                    <img
                      key={index}
                      src={
                        item
                          ? URL.createObjectURL(item)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  ))}
              </div>

              <div className="formInput1">
                <label>Deskripsi</label>
                <textarea
                  rows="4"
                  cols="80"
                  id="description"
                  value={dataProduct.description}
                  onChange={(e) => handleChange(e)}
                />
                {!dataProduct.description && validate && (
                  <span>tidak boleh kosong </span>
                )}
              </div>

              {/* color with stock */}
              <div className="formInput1">
                <label>Color :</label>
                {newColor.map((item, i) => (
                  <div className="sizeWrapp" key={i}>
                    <p>{item.name}</p>
                    <p>{item.stock}</p>
                    <div
                      name="color"
                      className="btn"
                      onClick={(e) => handleDelete(e, i)}
                    >
                      cancel
                    </div>
                  </div>
                ))}
                <div
                  className="inputWrapp"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    id="color"
                    name="name"
                    type="text"
                    value={tempValue.color.name || ""}
                    placeholder="color"
                    onChange={(e) => handleValueChange(e)}
                  />
                  <input
                    style={{ marginTop: "10px" }}
                    placeholder="stock"
                    id="color"
                    name="stock"
                    type="text"
                    value={tempValue.color.stock || ""}
                    onChange={(e) => handleValueChange(e)}
                  />
                  <div
                    id="color"
                    className="buttonColor"
                    onClick={(e) => handleAdd(e)}
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    Add
                  </div>
                </div>
                {!tempValue.color.length && validate && (
                  <span>color belum ditambahkan </span>
                )}
              </div>

              {/* size with stock */}
              <div className="formInput1">
                <label>Size :</label>
                {newSize.map((item, i) => (
                  <div className="sizeWrapp" key={i}>
                    <p>{item.name}</p>
                    <p>{item.stock}</p>
                    <div
                      name="size"
                      className="btn"
                      onClick={(e) => handleDelete(e, i)}
                    >
                      cancel
                    </div>
                  </div>
                ))}
                <div
                  className="inputWrapp"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    id="size"
                    name="name"
                    type="text"
                    value={tempValue.size.name || ""}
                    placeholder="size"
                    onChange={(e) => handleValueChange(e)}
                  />
                  <input
                    style={{ marginTop: "10px" }}
                    placeholder="stock"
                    id="size"
                    name="stock"
                    type="text"
                    value={tempValue.size.stock || ""}
                    onChange={(e) => handleValueChange(e)}
                  />
                  <div
                    id="size"
                    className="buttonColor"
                    onClick={(e) => handleAdd(e)}
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    Add
                  </div>
                </div>
                {!tempValue.color.length && validate && (
                  <span>color belum ditambahkan </span>
                )}
              </div>

              {/* size */}
              {/* <div className="formInput1">
                <label>Size :</label>
                {data.size?.map((item, i) => (
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
              </div> */}

              {/* color */}
              {/* <div className="formInput1">
                <label>Color :</label>
                {data.color?.map((item, i) => (
                  <div className="sizeWrapp" key={i}>
                    <p>{item.toUpperCase()}</p>
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
              </div> */}

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

export default UpdateProduct;
