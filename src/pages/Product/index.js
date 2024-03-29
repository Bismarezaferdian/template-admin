import React from "react";
import { ToastContainer } from "react-toastify";
// import Datatables from "../../components/Datatables";
import Navbar from "../../components/Navbar";
import ProductTable from "../../components/ProductTable";
import Sidebar from "../../components/Sidebar";
import "../List/index.scss";

const Product = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ToastContainer />
        <ProductTable columns={columns} />
      </div>
    </div>
  );
};

export default Product;
