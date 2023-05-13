import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../table.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { fetchData } from "../../useFetch";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllUser, getProduct } from "../../redux.js/apiCall";
import { ToastContainer } from "react-toastify";
import { errorMessage, successMessage } from "../../utils/Toastify";

const ProductTable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];
  const { products, isFetch, error } = useSelector((state) => state.product);
  const [deleteStat, setDeleteStat] = useState(false);
  useEffect(() => {
    document.title = `admin ${path}`;
  }, [path]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch, deleteStat]);

  const handleUpdate = (params) => {
    const id = params.row._id;
    navigate("/products/updateProduct", { state: { id } });
  };

  const handleDelete = (params) => {
    const id = params.row._id;
    deleteProduct(dispatch, id, navigate, successMessage, errorMessage)
      .then(() => setDeleteStat(!deleteStat))
      .catch(() => console.log("failed"));
  };

  const actionColummn = {
    field: "action",
    headerName: "Action",
    width: 140,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <button
            className="updateButton"
            disabled={isFetch}
            onClick={() => handleUpdate(params)}
          >
            Update
          </button>
          <button
            className="deleteButton"
            disabled={isFetch}
            onClick={() => handleDelete(params)}
          >
            Delete
          </button>
        </div>
      );
    },
  };

  return (
    <>
      <ToastContainer />
      <div className="datatable">
        <div className="datatableTitle">
          List Products
          <Link to="/products/newproduct" className="link">
            Add New{" "}
          </Link>
        </div>
        <DataGrid
          rows={products}
          columns={columns.concat(actionColummn)}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection
          getRowId={(row) => row._id}
          rowSelection={false}
        />
      </div>
    </>
  );
};

export default ProductTable;
