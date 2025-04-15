// utils/api.js
export const uploadFileToHDFS = async (
  file,
  hdfsPath,
  uploadedFileName,
  username
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("hdfsPath", "/kalas");
  formData.append("uploadedFileName", uploadedFileName);
  formData.append("username", "kalas");

  try {
    const response = await fetch(
      "http://192.168.29.61:8080/api/hdfs/uploadFile",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json(); // or response.json() if JSON is returned

      console.log("Response:", data);
    } else {
      console.error("Upload failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("An error occurred while uploading the file.");
  }
};
