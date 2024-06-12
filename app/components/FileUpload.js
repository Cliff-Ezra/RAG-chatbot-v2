import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // console.log("uploaded files:", uploadedFiles);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const { data: files, error: filesError } = await supabase.storage
        .from("documents")
        .list("", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      if (filesError) {
        console.error("Error fetching files:", filesError);
      } else {
        const fileNames = files.map((file) => file.name);
        setUploadedFiles(fileNames);
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

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
      const response = await fetch("/api/upload?folder=public", {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      if (response.ok) {
        console.log("Files uploaded successfully");
        setFiles([]);
        setProgress(0);
        fetchUploadedFiles();
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
    <div className="p-1">
      <div className="mb-4">
        <label htmlFor="file-upload" className="block font-bold mb-2">
          File Upload
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <div className="h-4 w-full bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Upload Files
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* <div className="mt-8">
        <h2 className="font-bold text-xl mb-4">Uploaded Files</h2>
        {uploadedFiles.length > 0 ? (
          <ul className="list-disc list-inside">
            {uploadedFiles.map((fileName) => (
              <li key={fileName} className="mb-2">
                {fileName}
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div> */}
    </div>
  );
};

export default FileUpload;
