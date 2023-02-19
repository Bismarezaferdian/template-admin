import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./index.scss";
import { fetchData } from "../../useFetch";
import { useLocation } from "react-router-dom";
import { color } from "@mui/system";

function NewProduct({ inputs, title }) {
  const location = useLocation();
  const [file, setFile] = useState("");
  //send data base
  const [dataProduct, setDataProduct] = useState({});
  const [categories, setCategories] = useState([]);
  //send databse
  const [dataCat, setDataCat] = useState([]);
  // const [newColor, setNewColor] = useState("");
  // const [newSize, setNewSize] = useState("");
  const [newData, setNewData] = useState("");
  //send database
  const [data, setData] = useState({
    color: ["red", "blue"],
    size: [],
  });
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
    const datas = { ...data };
    datas[name].splice(i, 1);
    setData(datas);
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
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title} </h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput1">
                <label>Desc</label>
                <textarea
                  rows="4"
                  cols="80"
                  id="description"
                  value={setDataProduct.description}
                  onChange={(e) => handleChange(e)}
                />
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
              </div>

              {/* categorie */}
              <div className="formInput1">
                <div className="categorieWrapp"></div>
                <label>Pilih Categorie :</label>
                <div className="checkbox">
                  {categories.map((cat, i) => (
                    <label>
                      <input
                        type="checkbox"
                        key={i}
                        value={cat.name}
                        onChange={handleSelect}
                        checked={dataCat.includes(cat.name)}
                      />
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
