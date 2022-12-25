import React from "react";
import Datatables from "../../components/Datatables";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Widget from "../../components/Widget";
import "./index.scss";

const Home = ({ columns }) => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        {/* 
      <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div> */}
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Datatables columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
