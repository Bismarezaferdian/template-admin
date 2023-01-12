import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../table.scss";
import { Link, useLocation } from "react-router-dom";
// import { fetchData } from "../../useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux.js/apiCall";

const OrderTable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const { products, isFetch, error } = useSelector((state) => state.product);
  console.log(products, isFetch, error);
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
      <div className="datatableTitle">
        Add New Product
        <Link to="/users/new" className="link">
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

export default OrderTable;
