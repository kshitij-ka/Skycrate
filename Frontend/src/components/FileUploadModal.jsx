import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const FileUploadModal = ({ show, onClose, onUploadSuccess }) => {
  const currentPath = useSelector((state) => state.path.currentPath);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [folderMessage, setFolderMessage] = useState("");
  const username = localStorage.getItem("username");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const isFolderNameValid = (name) => {
    return /^[a-zA-Z0-9-_ ]+$/.test(name); // disallow special chars like / \ * ? etc.
  };

  const uploadFileToHDFS = async () => {
    if (!file) {
      setUploadMessage("⚠️ Please select a file before uploading.");
      return;
    }
    const formData = new FormData();

    formData.append("file", file);
    formData.append("hdfsPath", currentPath);
    formData.append("uploadedFileName", file.name);
    formData.append("username", username);

    try {
      setUploading(true);
      setUploadMessage("⏳ Uploading file...");
      const response = await fetch(`${API_URL}/api/hdfs/uploadFile`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        setUploadMessage(`❌ Upload failed: ${errorText}`);
      } else {
        setUploadMessage("✅ File uploaded successfully!");
        onUploadSuccess();
        setTimeout(() => {
          setUploadMessage("");
          onClose();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setUploadMessage("❌ An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) {
      setFolderMessage("⚠️ Please enter a folder name.");
      return;
    }
    if (!isFolderNameValid(newFolderName.trim())) {
      setFolderMessage("❌ Folder name contains invalid characters.");
      return;
    }

    try {
      setCreatingFolder(true);
      setFolderMessage("⏳ Creating folder...");
      const folderPath =
        currentPath === "/" ? "" : currentPath.replace(/\/$/, "");
      const newFolderPath = `${folderPath}/${newFolderName}`;
      console.log(newFolderPath);
      const response = await fetch(
        `${API_URL}/api/hdfs/createFolder?hdfsPath=${newFolderPath}`,
        { method: "POST" }
      );

      if (!response.ok) {
        const errorText = await response.text();
        setFolderMessage(`❌ Folder creation failed: ${errorText}`);
      } else {
        setFolderMessage("✅ Folder created successfully!");
        onUploadSuccess();
        setNewFolderName("");
        setTimeout(() => {
          setFolderMessage("");
          onClose();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setFolderMessage("❌ An error occurred during folder creation.");
    } finally {
      setCreatingFolder(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Manage HDFS</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        <div className="p-6 space-y-8">
          {/* File Upload Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Upload File
            </h3>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mb-3 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {file && (
              <p className="text-sm text-gray-700 mb-2">
                Selected file: <strong>{file.name}</strong>
              </p>
            )}
            {uploadMessage && (
              <p className="text-sm text-gray-600 mb-3">{uploadMessage}</p>
            )}
            <button
              onClick={uploadFileToHDFS}
              disabled={uploading}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? "⏳ Uploading..." : "Upload File"}
            </button>
          </div>

          {/* Create Folder Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Create Folder
            </h3>
            <input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {folderMessage && (
              <p className="text-sm text-gray-600 mb-3">{folderMessage}</p>
            )}
            <button
              onClick={createFolder}
              disabled={creatingFolder}
              className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {creatingFolder ? "⏳ Creating..." : "Create Folder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
FileUploadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
};

export default FileUploadModal;
