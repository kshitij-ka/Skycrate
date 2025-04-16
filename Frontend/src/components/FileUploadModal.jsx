import React, { useState } from "react";
import { useSelector } from "react-redux";

const FileUploadModal = ({ show, onClose, onUploadSuccess }) => {
  const currentPath = useSelector((state) => state.path.currentPath);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFileToHDFS = async () => {
    if (!file) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("hdfsPath", currentPath);
    formData.append("uploadedFileName", file.name);
    formData.append("username", "kalas");

    try {
      setUploading(true);
      setMessage("Uploading file...");

      const response = await fetch(
        `http://192.168.29.61:8080/api/hdfs/uploadFile`,
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(`Upload failed: ${errorText}`);
      } else {
        setMessage("File uploaded successfully!");
        onUploadSuccess(); // Notify Dashboard to refresh file list
        setTimeout(onClose, 1000);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 z-50">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h3 className="text-lg font-semibold">Upload File</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full mb-4"
          />
          {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Close
            </button>
            <button
              onClick={uploadFileToHDFS}
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
