import React from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>
            This is your custom dashboard body. Place your widgets, charts,
            stats, or other components here.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
