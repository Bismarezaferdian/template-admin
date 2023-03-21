import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory, getCategory } from "../../redux.js/apiCall";
import { errorMessage, successMessage } from "../../utils/Toastify";
import "../table.scss";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, isFetch, error } = useSelector(
    (state) => state.categorie
  );

  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);

  const handleUpdate = (e, id) => {
    e.preventDefault();
    navigate("/category/updateCategory", { state: id });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteCategory(dispatch, id);
    successMessage("success delete category");
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        List Products
        <Link to="/category/newCategory" className="link">
          Add New{" "}
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name Categories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                {/* <TableCell>{row.name}</TableCell> */}
                <TableCell>{row.name.toUpperCase()}</TableCell>
                <TableCell>
                  <div className="cellAction">
                    <button
                      className="updateButton"
                      disabled={isFetch}
                      style={{ padding: 6 }}
                      onClick={(e) => handleUpdate(e, row._id)}
                    >
                      Update
                    </button>
                    <button
                      className="deleteButton"
                      disabled={isFetch}
                      style={{ padding: 6 }}
                      onClick={(e) => handleDelete(e, row._id)}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryTable;
