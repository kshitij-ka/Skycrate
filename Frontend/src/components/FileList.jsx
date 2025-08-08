import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath } from "../store/pathSlice";
import PasswordForDownload from "./PasswordForDownload";
import {
  FileText,
  FileVideo,
  FileImage,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  FileType2,
  FileCode2,
  Presentation,
  Folder,
  Download,
  Trash2,
  ArrowLeft,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const FileList = ({ initialPath }) => {
  const username = localStorage.getItem("username") || "";
  const userRoot = `/${username}`;

  // Use Redux state as the single source of truth
  const reduxCurrentPath = useSelector((state) => state.path?.currentPath);
  const currentPath = reduxCurrentPath || initialPath || userRoot;

  const [files, setFiles] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadFilename, setDownloadFilename] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.upload.isUploading);

  // Initialize Redux state if it's empty or not user-specific
  useEffect(() => {
    if (
      !reduxCurrentPath ||
      reduxCurrentPath === "/" ||
      !reduxCurrentPath.includes(username)
    ) {
      console.log("FileList: Initializing Redux path to user root:", userRoot);
      dispatch({ type: "path/resetToUserRoot" });
    }
  }, [dispatch, userRoot, username, reduxCurrentPath]);

  const getType = (entry) =>
    entry.trim().startsWith("📁") ? "Folder" : "File";
  const getName = (entry) => entry.trim().replace(/^📁\s*|^📄\s*/, "");
  const isFile = (entry) => getType(entry) === "File";

  const getIcon = (name, type) => {
    if (type === "Folder")
      return <Folder className="text-yellow-500 w-5 h-5 mr-2" />;
    const ext = name.split(".").pop().toLowerCase();
    switch (ext) {
      case "txt":
        return <FileText className="text-gray-700 w-5 h-5 mr-2" />;
      case "mp4":
      case "mkv":
        return <FileVideo className="text-purple-500 w-5 h-5 mr-2" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage className="text-pink-500 w-5 h-5 mr-2" />;
      case "mp3":
      case "wav":
        return <FileAudio className="text-indigo-500 w-5 h-5 mr-2" />;
      case "zip":
      case "rar":
      case "tar":
      case "gz":
        return <FileArchive className="text-red-500 w-5 h-5 mr-2" />;
      case "csv":
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="text-green-500 w-5 h-5 mr-2" />;
      case "ppt":
      case "pptx":
        return <Presentation className="text-orange-500 w-5 h-5 mr-2" />;
      case "js":
      case "html":
      case "css":
      case "java":
      case "py":
      case "cpp":
        return <FileCode2 className="text-blue-500 w-5 h-5 mr-2" />;
      default:
        return <FileType2 className="text-gray-500 w-5 h-5 mr-2" />;
    }
  };

  const fetchFiles = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No authentication token found");
        setError("Authentication token missing. Please log in again.");
        return;
      }

      console.log("Fetching files for path:", currentPath);
      console.log("Using token:", token.substring(0, 20) + "..."); // Log first 20 chars for debugging

      const res = await fetch(
        `${API_URL}/api/hdfs/listFiles?hdfsPath=${encodeURIComponent(
          currentPath
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch files:", res.status, errorText);

        if (res.status === 401) {
          setError("Authentication failed. Please log in again.");
          // Optionally redirect to login or refresh token
        } else {
          setError(`Failed to fetch files: ${errorText}`);
        }
        setFiles([]);
        return;
      }

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        const filtered = data.filter(
          (entry) => entry.match(/^ */)[0].length === 0
        );
        setFiles(filtered);
        console.log("Files fetched successfully:", filtered);
      } else {
        // Handle non-JSON response
        const textData = await res.text();
        console.error("Unexpected response format:", textData);
        setError("Unexpected response format from server");
        setFiles([]);
      }
    } catch (err) {
      console.error("Failed to fetch files:", err);
      if (err.name === "SyntaxError" && err.message.includes("JSON")) {
        setError("Server returned invalid response. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
      setFiles([]);
    }
  };

  const deleteFileOrFolder = async (name, type, e) => {
    e.stopPropagation();
    try {
      const hdfsPath = `${currentPath}/${name}`;
      const endpoint =
        type === "File"
          ? `${API_URL}/api/hdfs/deleteFile?hdfsPath=${encodeURIComponent(
              hdfsPath
            )}`
          : `${API_URL}/api/hdfs/deleteFolder?hdfsPath=${encodeURIComponent(
              hdfsPath
            )}`;

      const token = localStorage.getItem("accessToken");
      const resp = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Deletion failed:", errorText);
        setError(`Failed to delete ${type.toLowerCase()}: ${errorText}`);
      } else {
        console.log(`${type} deleted successfully:`, name);
        fetchFiles(); // Refresh the file list
      }
    } catch (err) {
      console.error("Failed to delete:", err);
      setError(`Error deleting ${type.toLowerCase()}: ${err.message}`);
    }
  };

  useEffect(() => {
    if (currentPath) {
      fetchFiles();
    }
  }, [currentPath, isUploading]);

  // Listen for manual refresh events from Dashboard
  useEffect(() => {
    const handleRefreshEvent = () => {
      fetchFiles();
    };

    window.addEventListener("refreshFileList", handleRefreshEvent);
    return () => {
      window.removeEventListener("refreshFileList", handleRefreshEvent);
    };
  }, []);

  // Reset isUploading after files are fetched
  useEffect(() => {
    if (isUploading) {
      // Reset the uploading state after a successful fetch
      const timer = setTimeout(() => {
        dispatch({ type: "upload/setIsUploading", payload: false });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isUploading, dispatch]);

  const handleOpenFolder = (folderName) => {
    // Ensure we don't have double slashes and construct the path correctly
    const cleanCurrentPath = currentPath.replace(/\/+$/, ""); // Remove trailing slashes
    const newPath = `${cleanCurrentPath}/${folderName}`;

    console.log("Opening folder - Current path:", currentPath);
    console.log("Opening folder - Folder name:", folderName);
    console.log("Opening folder - New path:", newPath);

    // Update Redux state directly instead of local state
    dispatch(setCurrentPath(newPath));
  };

  const goBack = () => {
    if (currentPath === userRoot) return;
    const parts = currentPath.split("/").filter(Boolean);
    parts.pop();
    const newPath = parts.length === 0 ? userRoot : `/${parts.join("/")}`;

    console.log("Going back - Current path:", currentPath);
    console.log("Going back - New path:", newPath);

    // Update Redux state directly
    dispatch(setCurrentPath(newPath));
  };

  // open modal instead of direct download
  const openDownloadModal = (name, e) => {
    e.stopPropagation();
    setDownloadFilename(name);
    setShowDownloadModal(true);
  };

  return (
    <>
      <div className="relative overflow-x-auto rounded-2xl shadow-lg border border-blue-200">
        <div className="flex items-center justify-between px-6 py-4 bg-blue-100 text-black font-semibold text-sm">
          <span className="truncate max-w-[80%]">Path: {currentPath}</span>
          {currentPath !== userRoot && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          )}
        </div>

        {error && (
          <div className="px-6 py-4 bg-red-50 border-b border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs uppercase bg-blue-50 text-blue-800 border-b border-blue-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-gray-500 text-center">
                  {error ? "Failed to load files." : "No files found."}
                </td>
              </tr>
            ) : (
              files.map((entry, idx) => {
                const name = getName(entry);
                const type = getType(entry);
                return (
                  <tr
                    key={idx}
                    onClick={
                      type === "Folder"
                        ? () => handleOpenFolder(name)
                        : undefined
                    }
                    className={`even:bg-blue-50 odd:bg-white border-b border-blue-100 transition hover:bg-blue-100 ${
                      type === "Folder" ? "cursor-pointer" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium flex items-center">
                      {getIcon(name, type)}
                      {name}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      {isFile(entry) && (
                        <button
                          onClick={(e) => openDownloadModal(name, e)}
                          className="text-blue-600 hover:underline inline-flex items-center"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      )}
                      <button
                        onClick={(e) => deleteFileOrFolder(name, type, e)}
                        className="text-red-600 hover:underline inline-flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showDownloadModal && (
        <PasswordForDownload
          filename={downloadFilename}
          onDownload={fetchFiles}
          onClose={() => setShowDownloadModal(false)}
        />
      )}
    </>
  );
};

FileList.propTypes = {
  initialPath: PropTypes.string,
};

export default FileList;
