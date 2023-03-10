import React from "react";
// import Datatables from "../../components/Datatables";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ProductList from "../ProductList";
import "./index.scss";

const List = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ProductList columns={columns} />
      </div>
    </div>
  );
};

export default List;
