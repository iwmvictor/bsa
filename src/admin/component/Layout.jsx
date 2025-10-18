import React from "react";
import DashboardHeader from "./Header";
import { Outlet } from "react-router-dom";

import './../../styles/admin.scss'

const DashboardLayout = () => {
  return (
    <>
      <div className="admin-layout">
        <DashboardHeader />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
