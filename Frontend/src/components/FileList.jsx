import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const FileTable = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState(initialPath || "/");
  const [files, setFiles] = useState([]);

  // Helpers to parse entry
  const getType = (entry) =>
    entry.trim().startsWith("📁") ? "Folder" : "File";
  const getName = (entry) => entry.trim().replace(/^📁\s*|^📄\s*/, "");
  const isFile = (entry) => getType(entry) === "File";

  // Fetch and show only top-level entries (indentation = 0)
  const fetchFiles = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.61:8080/api/hdfs/listFiles?hdfsPath=${currentPath}`
      );
      const data = await response.json();

      // Filter entries: only those without leading spaces
      const filtered = data.filter(
        (entry) => entry.match(/^ */)[0].length === 0
      );
      setFiles(filtered);
    } catch (error) {
      console.error("Failed to fetch files:", error);
      setFiles([]);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  // Navigate into a folder
  const handleOpenFolder = (folderName) => {
    const newPath =
      currentPath === "/" ? `/${folderName}` : `${currentPath}/${folderName}`;
    setCurrentPath(newPath);
  };

  // Go up one level
  const goBack = () => {
    if (currentPath === "/") return;
    const parts = currentPath.split("/").filter(Boolean);
    parts.pop();
    setCurrentPath(parts.length === 0 ? "/" : `/${parts.join("/")}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <div className="flex items-center justify-between px-6 py-4 bg-blue-100 text-black font-medium">
        <span>Path: {currentPath}</span>
        {currentPath !== "/" && (
          <button onClick={goBack} className="text-blue-600 hover:underline">
            ⬅️ Go Back
          </button>
        )}
      </div>
      <table className="w-full text-sm text-left text-black">
        <thead className="text-xs text-black uppercase bg-blue-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              File Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-gray-600">
                No files found.
              </td>
            </tr>
          ) : (
            files.map((entry, idx) => {
              const name = getName(entry);
              const type = getType(entry);
              const encodedPath = encodeURIComponent(`${currentPath}/${name}`);
              const downloadUrl = `http://192.168.29.61:8080/api/hdfs/downloadFile?hdfsPath=${encodedPath}&localPath=E:/testdownload/${name}&kalas=${
                currentPath.split("/")[1] || "user"
              }`;

              return (
                <tr
                  key={idx}
                  className="even:bg-blue-50 odd:bg-white border-b border-blue-200"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {name}
                  </td>
                  <td className="px-6 py-4">{type}</td>
                  <td className="px-6 py-4">
                    {isFile(entry) ? (
                      <a
                        href={downloadUrl}
                        className="font-medium text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    ) : (
                      <button
                        onClick={() => handleOpenFolder(name)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Open
                      </button>
                    )}
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
