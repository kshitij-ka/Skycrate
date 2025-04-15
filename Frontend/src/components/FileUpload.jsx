import React, { useState } from "react";
import { uploadFileToHDFS } from "../utils/api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [hdfsPath, setHdfsPath] = useState("/kalas");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [username, setUsername] = useState("kalas");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !uploadedFileName) {
      return;
    }
    uploadFileToHDFS(file, hdfsPath, uploadedFileName, username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 py-16 border rounded shadow w-full max-w-md"
    >
      <h2 className="text-lg font-bold mb-2">Upload File Your File</h2>

      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setUploadedFileName(e.target.files[0]?.name || "");
        }}
        className="mb-2"
      />

      {/* <input
        type="text"
        placeholder="HDFS Path"
        value={hdfsPath}
        onChange={(e) => setHdfsPath(e.target.value)}
        className="border p-2 mb-2 w-full"
      /> */}

      {/* <input
        type="text"
        placeholder="Uploaded File Name"
        value={uploadedFileName}
        onChange={(e) => setUploadedFileName(e.target.value)}
        className="border p-2 mb-2 w-full"
      /> */}

      {/* <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full"
      /> */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload File
      </button>
    </form>
  );
};

export default FileUpload;
