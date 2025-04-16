import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import FileList from "../../components/FileList";
import FileUploadModal from "../../components/FileUploadModal"; // renamed the import accordingly

import { FiPlus } from "react-icons/fi";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  // State to manage upload modal visibility
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchFiles = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.61:8080/api/hdfs/listFiles?hdfsPath=/"
      );
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
    // downloadFile("/sonali/cc.pptx", "kalas");
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {/* Use onClick to toggle the modal */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
              type="button"
            >
              <FiPlus className="text-2xl" />
            </button>
          </div>
          <FileList files={files} />
        </div>
      </div>

      {/* Render the FileUploadModal with proper props */}
      <FileUploadModal
        show={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={() => {
          fetchFiles();
          // Optionally close the modal after upload success
          setIsUploadModalOpen(false);
        }}
      />
    </>
  );
};

export default Dashboard;
