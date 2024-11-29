import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
