import React from "react";
import Sidebar from "../../components/Sidebar";
import FileList from "../../components/FileList";

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
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          <FileList files={files}></FileList>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
