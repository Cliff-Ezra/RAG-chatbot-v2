import { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    setError(null);
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Files</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
