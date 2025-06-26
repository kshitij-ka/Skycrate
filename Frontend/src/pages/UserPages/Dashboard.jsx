import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // for multilinguality
import Sidebar from "../../components/Sidebar";
import FileList from "../../components/FileList";
import FileUploadModal from "../../components/FileUploadModal";
import { FiPlus } from "react-icons/fi";

const Dashboard = () => {
  const { t } = useTranslation(); // for multilinguality
  const [files, setFiles] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const expiresIn = localStorage.getItem("expiresIn");

    if (!token || !username || !expiresIn) return false;

    const expiryTime = new Date(expiresIn).getTime();
    const now = new Date().getTime();

    if (now > expiryTime) {
      localStorage.clear();
      return false;
    }

    return true;
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${API_URL}/api/hdfs/listFiles?hdfsPath=/`);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
      setError(t("failed_to_load_files"));
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login");
    } else {
      fetchFiles();
    }
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">{t("dashboard")}</h1>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
              type="button"
            >
              <FiPlus className="text-2xl" />
            </button>
          </div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <FileList files={files} />
          )}
        </div>
      </div>

      <FileUploadModal
        show={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={() => {
          fetchFiles();
          setIsUploadModalOpen(false);
        }}
      />
    </>
  );
};

export default Dashboard;
