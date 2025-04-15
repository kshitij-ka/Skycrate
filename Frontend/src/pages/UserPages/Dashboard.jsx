import React from "react";
import Sidebar from "../../components/Sidebar";
import FileList from "../../components/FileList";
import FileUpload from "../../components/FileUpload";
import { FiPlus } from "react-icons/fi";

const Dashboard = () => {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://192.168.29.61:8080/api/hdfs/listFiles?hdfsPath=/"
      );
      const data = await response.json();
      setFiles(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-170 h-150 flex items-center justify-center">
          {/* <!-- Modal content --> */}
          <div class="relative bg-white rounded-lg shadow-sm ">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-2 md:p-5  rounded-t dark:border-gray-600 border-gray-200">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Static modal
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-4 md:p-5 space-y-4">
              <FileUpload />
            </div>
            {/* <!-- Modal footer --> */}
            {/* <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                    <button
                      data-modal-hide="static-modal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      I accept
                    </button>
                    <button
                      data-modal-hide="static-modal"
                      type="button"
                      class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Decline
                    </button>
                  </div> */}
          </div>
        </div>
      </div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button
              data-modal-target="static-modal"
              data-modal-toggle="static-modal"
              class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              <FiPlus className="text-2xl" />
            </button>
          </div>

          <FileList files={files}></FileList>
          <section className="w-full flex justify-end items-center min-h-160">
            {/* <!-- Modal toggle --> */}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
