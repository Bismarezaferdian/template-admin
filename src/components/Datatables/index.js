import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../table.scss";
import { Link, useLocation } from "react-router-dom";
import { fetchData } from "../../useFetch";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: "pending" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    status: "success",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    status: "success",
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, status: "passive" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    status: "success",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
    status: "passive",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    status: "passive",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    status: "pending",
  },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, status: "pending" },
];

const Datatables = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetchData.get(`${path}`);
  //     setData(res.data);
  //   };
  //   getData();
  // }, []);

  // console.log(data);

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
        rows={rows}
        columns={columns.concat(actionColummn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatables;
