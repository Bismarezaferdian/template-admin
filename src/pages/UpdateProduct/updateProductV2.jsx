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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

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
  const [tempVariant, setTempVariant] = useState({
    color: "",
    size: "",
    stock: "",
  });
  const [variant, setVariant] = useState([]);

  const [newColor, setNewColor] = useState([]);
  const [newSize, setNewSize] = useState([]);
  const [id, setId] = useState();

  const [validate, setValidate] = useState(false);

  const lowerCase = (string) => {
    return string.toLowerCase();
  };

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
                <label>Desc</label>
                <textarea
                  rows="4"
                  cols="80"
                  id="description"
                  // value={dataProduct.description}
                  onChange={(e) => handleChange(e)}
                />
                {!dataProduct.description && validate && (
                  <span>tidak boleh kosong </span>
                )}
              </div>
              {/* <div>
                <Accordion sx={{ width: "400px" }}>
                  <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Add Variants</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Color</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Stock</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {variant?.map((item, i) => (
                            <TableRow
                              key={i}
                              // sx={{
                              //   "&:last-child td, &:last-child th": {
                              //     border: 1,
                              //   },
                              // }}
                            >
                              <TableCell>{item.color}</TableCell>
                              <TableCell>{item.size}</TableCell>
                              <TableCell>{item.stock}</TableCell>
                              <TableCell>
                                <div
                                  name="color"
                                  className="btn"
                                  onClick={() => handleDelete(i)}
                                >
                                  cancel
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {Object.keys(tempVariant).map((item, i) => (
                      <div className="formInput1" key={i}>
                        <label>{item} :</label>

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
                            id={item}
                            name={item}
                            type="text"
                            value={tempVariant[item] || ""}
                            placeholder={item}
                            onChange={(e) => handleValueChange(e)}
                          />
                        </div>
                        {!variant.length && validate && (
                          <span>{item} belum ditambahkan </span>
                        )}
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
                  </AccordionDetails>
                </Accordion>
                {!variant.length && validate && (
                  <span>variant belum ditambahkan </span>
                )}
              </div> */}
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
                Update test
              </button>
              tets
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
