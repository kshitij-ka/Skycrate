import React, { useState } from "react";
// Adjust the import for FileUpload to the correct location:
import FileUploadModal from "../../components/FileUploadModal";
const UploadFile = () => {
  // Control modal visibility with state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy callback or proper function if necessary
  const fetchFiles = () => {
    console.log("Upload succeeded, fetch or update file list here.");
  };

  return (
    <>
      {/* Button or trigger to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Upload Modal
      </button>

      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden={!isModalOpen}
        className={`${
          isModalOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-170 h-150 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-2 md:p-5 rounded-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Upload File
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="static-modal"
              >
                ✖
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <FileUploadModal onUploadSuccess={fetchFiles} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
