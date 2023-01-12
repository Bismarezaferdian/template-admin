import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../table.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux.js/apiCall";

const UserTable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const { allUsers, isFetch, error } = useSelector((state) => state.allUser);
  console.log(allUsers, isFetch, error);
  useEffect(() => {
    document.title = `admin ${path}`;
  }, [path]);

  useEffect(() => {
    getAllUser(dispatch);
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
        Add New User
        <Link to="/users/new" className="link">
          Add New{" "}
        </Link>
      </div>
      <DataGrid
        rows={allUsers}
        columns={columns.concat(actionColummn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default UserTable;
