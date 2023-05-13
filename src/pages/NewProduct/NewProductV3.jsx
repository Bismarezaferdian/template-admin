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
  warningMessage,
} from "../../utils/Toastify";
import { toast, ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
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

function NewProductV3({ inputs, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const dispatch = useDispatch();
  const { isFetch, products } = useSelector((state) => state.product);
  //LOCAL STATE
  const [imgDetail, setImgDetail] = useState([]);
  const [imgDisplay, setImgDisplay] = useState();
  //send data base
  const [dataProduct, setDataProduct] = useState({
    title: "",
    weight: "",
    price: "",
    desc: "",
  });
  const [categories, setCategories] = useState([]);
  //send databse
  const [dataCat, setDataCat] = useState([]);
  //send database
  const [tempVariant, setTempVariant] = useState({
    color: "",
    size: "",
    stock: "",
  });
  const [variant, setVariant] = useState([]);
  const [validate, setValidate] = useState(false);
  const [id, setId] = useState();
  console.log(variant);
  useEffect(() => {
    if (product?.id) {
      const prod = products.find((item) => item._id === product?.id);
      console.log(prod);
      if (prod) {
        setId(prod._id);
        setVariant(prod.variant);
        setDataCat(prod.categories.map((item) => item._id));
        setDataProduct({
          title: prod.title,
          price: prod.price,
          weight: prod.weight,
          desc: prod.desc,
        });
      }
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

  const lowerCase = (string) => {
    return string.toLowerCase();
  };

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

  const handleValueChange = (event) => {
    const { id, value } = event.target;
    setTempVariant((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDelete = (e) => {
    const datas = [...variant];
    datas.splice(e, 1);
    setVariant(datas);
  };

  const handleEdit = (item, i) => {
    setTempVariant((prevState) => ({
      ...prevState,
      color: item.color,
      size: item.size,
      stock: item.stock,
    }));
    const datas = [...variant];
    datas.splice(i, 1);
    setVariant(datas);
  };

  const handleAdd = () => {
    setVariant([...variant, tempVariant]);
    setTempVariant((prev) => ({ ...prev, color: "", size: "", stock: "" }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, desc, weight, price } = dataProduct;
    if (
      !title ||
      !desc ||
      !weight ||
      !price ||
      !imgDisplay ||
      !imgDetail.length
      // !data.size.length ||
      // !data.color.length
    ) {
      runValidate();
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    if (imgDisplay) {
      formData.append("imgDisplay", imgDisplay);
    }
    for (let i = 0; i < imgDetail.length; i++) {
      formData.append("imgDetail", imgDetail[i]);
    }
    formData.append("categories", dataCat);
    formData.append("variant", JSON.stringify(variant));
    formData.append("weight", weight);
    formData.append("price", price);
    // formData.append("title", "title");
    product?.id
      ? await updateProduct(
          dispatch,
          id,
          formData,
          navigate,
          toast,
          errorMessage
        )
      : await addProduct(
          dispatch,
          formData,
          navigate,
          successMessage,
          errorMessage
        );
  };

  //old version

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
                <label>Deskripsi</label>
                <textarea
                  rows="4"
                  cols="80"
                  id="desc"
                  value={dataProduct.desc || ""}
                  // value={
                  //   productUpdate
                  //     ? productUpdate.desc
                  //     : setDataProduct.description
                  // }
                  onChange={(e) => handleChange(e)}
                />
                {!dataProduct.desc && validate && (
                  <span>tidak boleh kosong </span>
                )}
              </div>
              <div>
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
                                  onClick={() => handleEdit(item, i)}
                                >
                                  edit
                                </div>
                              </TableCell>
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
              </div>
              {/* categorie */}
              <div className="formInput1">
                <div className="categorieWrapp"></div>
                <label>Pilih Categorie v3 :</label>
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
                {product?.id ? "update" : "Add Data"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProductV3;
