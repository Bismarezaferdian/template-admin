import React from "react";
// import Datatables from "../../components/Datatables";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../List/index.scss";

const Product = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <ProductTable columns={columns} /> */}
      </div>
    </div>
  );
};

export default Product;
