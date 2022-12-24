import React from "react";
import Datatables from "../../components/Datatables";
import Sidebar from "../../components/Sidebar";
import "./index.scss";

const List = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Datatables columns={columns} />
      </div>
    </div>
  );
};

export default List;
