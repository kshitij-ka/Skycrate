import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

  const [files, setFiles] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Auth check and redirect
  const checkAuthAndRedirect = useCallback(() => {
    const token = TokenManager.getAccessToken();
    if (!token) {
      navigate("/login", { replace: true });
      return false;
    }
    return true;
  }, [navigate]);

  // Fetch files with proper error handling
  const fetchFiles = useCallback(
    async (showRefreshIndicator = false) => {
      if (!checkAuthAndRedirect()) return;

      try {
        if (showRefreshIndicator) setRefreshing(true);
        else setLoading(true);

        const response = await ApiService.request(
          "/api/hdfs/listFiles?hdfsPath=/"
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setFiles(Array.isArray(data) ? data : []);
        setError("");

        if (showRefreshIndicator) {
          toast.success(t("files_refreshed"));
        }
      } catch (error) {
        console.error("Failed to fetch files:", error);

        if (
          error.message === "No authentication token" ||
          error.message === "Authentication failed"
        ) {
          TokenManager.clearTokens();
          navigate("/login", { replace: true });
          return;
        }

        const errorMessage = error.message.includes("HTTP 403")
          ? t("access_denied")
          : error.message.includes("HTTP 404")
          ? t("endpoint_not_found")
          : t("failed_to_load_files");

        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [checkAuthAndRedirect, navigate, t]
  );

  // Handle logout - simply clear tokens and redirect
  const handleLogout = useCallback(() => {
    TokenManager.clearTokens();
    toast.success(t("logged_out_successfully"));
    navigate("/login", { replace: true });
  }, [navigate, t]);

  // Handle upload success
  const handleUploadSuccess = useCallback(() => {
    setIsUploadModalOpen(false);
    fetchFiles(true); // Refresh with indicator
  }, [fetchFiles]);

  // Initial setup
  useEffect(() => {
    if (checkAuthAndRedirect()) {
      fetchFiles();
    }
  }, [checkAuthAndRedirect, fetchFiles]);

  // Auto-refresh files periodically (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = TokenManager.getAccessToken();
      if (token && !loading && !refreshing) {
        fetchFiles();
      }
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [fetchFiles, loading, refreshing]);

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
              {/* <p className="text-gray-600">
                {t("manage_your_files")} • {files.length} {t("files_total")}
              </p> */}
            </div>

            <div className="flex gap-2">
              {/* Refresh Button */}
              <button
                onClick={() => fetchFiles(true)}
                disabled={refreshing || loading}
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
                <span className="hidden sm:inline">{t("upload_file")}</span>
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
                onClick={() => fetchFiles()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t("try_again")}
              </button>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {t("no_files_found")}
              </h3>
              <p className="text-gray-500 mb-6">{t("upload_first_file")}</p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                {t("upload_your_first_file")}
              </button>
            </div>
          ) : (
            <FileList
              files={files}
              onFileDeleted={() => fetchFiles(true)}
              onFileUpdated={() => fetchFiles(true)}
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
