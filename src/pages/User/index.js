import React from "react";
// import Datatables from "../../components/Datatables";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import UserTable from "../../components/UserTable";
import "../List/index.scss";

const User = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <UserTable columns={columns} />
      </div>
    </div>
  );
};

export default User;
