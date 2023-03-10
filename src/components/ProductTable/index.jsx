import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../table.scss";
import { Link, useLocation } from "react-router-dom";
// import { fetchData } from "../../useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getProduct } from "../../redux.js/apiCall";
import { ToastContainer } from "react-toastify";

const ProductTable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const { products, isFetch, error } = useSelector((state) => state.product);
  useEffect(() => {
    document.title = `admin ${path}`;
  }, [path]);

  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);

  const actionColummn = {
    field: "action",
    headerName: "Action",
    width: 140,
    renderCell: () => {
      return (
        <div className="cellAction">
          <div className="viewButton">View</div>
          <div className="deleteButton">Delete</div>
        </div>
      );
    },
  };

  return (
    <div className="datatable">
      <ToastContainer />
      <div className="datatableTitle">
        Add New Product
        <Link to="/products/newproduct" className="link">
          Add New{" "}
        </Link>
      </div>
      <DataGrid
        rows={products}
        columns={columns.concat(actionColummn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ProductTable;
