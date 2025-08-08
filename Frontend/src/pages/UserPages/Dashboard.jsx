import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import FileList from "../../components/FileList";
import FileUploadModal from "../../components/FileUploadModal";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { TokenManager } from "../Authentication/Login"; // fixed import path

const API_URL = import.meta.env.VITE_API_URL;

// Simplified API utility
const ApiService = {
  async request(endpoint, options = {}) {
    const token = TokenManager.getAccessToken();

    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // If unauthorized, token is invalid
    if (response.status === 401) {
      throw new Error("Authentication failed");
    }

    return response;
  },
};

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current path from Redux
  const currentPath = useSelector((state) => state.path?.currentPath);
  const username = localStorage.getItem("username") || "";
  const userRoot = `/${username}`;

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error] = useState("");

  // Auth check and redirect
  const checkAuthAndRedirect = useCallback(() => {
    const token = TokenManager.getAccessToken();
    if (!token) {
      navigate("/login", { replace: true });
      return false;
    }
    return true;
  }, [navigate]);

  // Handle logout - simply clear tokens and redirect
  const handleLogout = useCallback(() => {
    TokenManager.clearTokens();
    toast.success(t("logged_out_successfully"));
    navigate("/login", { replace: true });
  }, [navigate, t]);

  // Handle upload success - this will trigger FileList to refresh
  const handleUploadSuccess = useCallback(() => {
    setIsUploadModalOpen(false);
    toast.success("File uploaded successfully!");
    // The FileList component will handle its own refresh via Redux state changes
  }, []);

  // Handle file list refresh from FileList component
  const handleFileListRefresh = useCallback(() => {
    setRefreshing(true);
    // FileList handles its own data fetching, we just show the refresh indicator
    setTimeout(() => {
      setRefreshing(false);
      toast.success(t("files_refreshed"));
    }, 500);
  }, [t]);

  // Manual refresh trigger
  const handleManualRefresh = useCallback(() => {
    handleFileListRefresh();
    // Force FileList to refresh by triggering a re-render
    window.dispatchEvent(new CustomEvent("refreshFileList"));
  }, [handleFileListRefresh]);

  // Initial setup and Redux path initialization
  useEffect(() => {
    if (checkAuthAndRedirect()) {
      // Initialize Redux path if not set or not user-specific
      if (
        !currentPath ||
        currentPath === "/" ||
        !currentPath.includes(username)
      ) {
        console.log("Initializing Redux path to:", userRoot);
        dispatch({ type: "path/resetToUserRoot" });
      } else {
        console.log("Redux path already set to:", currentPath);
      }
    }
    setLoading(false);
  }, [checkAuthAndRedirect, currentPath, userRoot, username, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar onLogout={handleLogout} />
      <div className="p-4 sm:ml-64">
        <div className="p-6 border-2 border-gray-200 border-dashed rounded-lg mt-14 bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {t("dashboard")}
              </h1>
              <p className="text-gray-600">
                Current Directory:{" "}
                <span className="font-mono text-blue-600">
                  {currentPath || userRoot}
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              {/* Refresh Button */}
              <button
                onClick={handleManualRefresh}
                disabled={refreshing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  refreshing
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title={t("refresh_files")}
              >
                <FiRefreshCw
                  className={`text-lg ${refreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">
                  {refreshing ? t("refreshing") : t("refresh")}
                </span>
              </button>

              {/* Upload Button */}
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FiPlus className="text-lg" />
                <span className="hidden sm:inline">
                  {currentPath && currentPath !== userRoot
                    ? `Upload to ${currentPath.split("/").pop()}`
                    : t("upload_file")}
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          {error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("error_occurred")}
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleManualRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t("try_again")}
              </button>
            </div>
          ) : (
            <FileList
              initialPath={userRoot}
              onRefresh={handleFileListRefresh}
            />
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <FileUploadModal
        show={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
};

export default Dashboard;
