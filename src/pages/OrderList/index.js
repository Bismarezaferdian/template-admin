import React from "react";
import Navbar from "../../components/Navbar";
import OrderTable from "../../components/OrderTable";
import Sidebar from "../../components/Sidebar";
import "../List/index.scss";

const Order = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <OrderTable columns={columns} />
      </div>
    </div>
  );
};

export default Order;
