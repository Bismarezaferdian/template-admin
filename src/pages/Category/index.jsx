import React from "react";
import { ToastContainer } from "react-toastify";
import CategoryTable from "../../components/CategoryTable";
// import Datatables from "../../components/Datatables";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../List/index.scss";

const Category = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ToastContainer />
        <CategoryTable />
      </div>
    </div>
  );
};

export default Category;
