import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath } from "../store/pathSlice";
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

const FileTable = ({ initialPath }) => {
  // Read username dynamically to avoid stale null on first load
  const username = localStorage.getItem("username") || "";
  const userRoot = `/${username}`;

  // Initialize currentPath only once with the correct userRoot
  const [currentPath, setCurrentPathState] = useState(
    () => initialPath || userRoot
  );
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.upload.isUploading);

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
      const res = await fetch(
        `${API_URL}/api/hdfs/listFiles?hdfsPath=${encodeURIComponent(
          currentPath
        )}`
      );
      const data = await res.json();
      const filtered = data.filter(
        (entry) => entry.match(/^ */)[0].length === 0
      );
      setFiles(filtered);
    } catch (err) {
      console.error("Failed to fetch files:", err);
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

      const resp = await fetch(endpoint, { method: "DELETE" });
      if (!resp.ok) console.error("Deletion failed:", await resp.text());
      fetchFiles();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  useEffect(() => {
    dispatch(setCurrentPath(currentPath));
    fetchFiles();
  }, [currentPath, dispatch, isUploading]);

  const handleOpenFolder = (folderName) => {
    setCurrentPathState((prev) => `${prev}/${folderName}`);
  };

  const goBack = () => {
    if (currentPath === userRoot) return;
    const parts = currentPath.split("/").filter(Boolean);
    parts.pop();
    setCurrentPathState(parts.length === 0 ? userRoot : `/${parts.join("/")}`);
  };

  const handleFileDownload = async (hdfsPath, name, event) => {
    event.stopPropagation();
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/hdfs/downloadFile?hdfsEncPath=${encodeURIComponent(
          hdfsPath
        )}&localPath=${name}&username=${username}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (!response.ok) throw new Error(await response.text());
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      fetchFiles();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Something went wrong while downloading the file.");
    }
  };

  return (
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
                No files found.
              </td>
            </tr>
          ) : (
            files.map((entry, idx) => {
              const name = getName(entry);
              const type = getType(entry);
              const hdfsPath = `${currentPath}/${name}`;

              return (
                <tr
                  key={idx}
                  onClick={
                    type === "Folder" ? () => handleOpenFolder(name) : undefined
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
                        onClick={(e) => handleFileDownload(hdfsPath, name, e)}
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
  );
};

FileTable.propTypes = {
  initialPath: PropTypes.string,
};

export default FileTable;
