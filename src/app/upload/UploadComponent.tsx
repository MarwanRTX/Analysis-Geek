"use client"; // Ensure this is marked as a client component

import { useDropzone } from "react-dropzone"; 
import { useState } from "react";

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  // Set up dropzone options
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  // Send data to the backend (Flask server)
  const fetchData = async (option: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("option", option);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data); // Log the result
        setResult(data); // Set the response data to state
      } else {
        const errorData = await response.json();
        alert(errorData.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  };

  // Ensure columns exist before calling .map()
  const renderTable = () => {
    if (!result || !result.columns) return null;

    const { columns, data } = result;

    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((column: string) => (
              <th
                key={column}
                style={{
                  padding: "8px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell: any, cellIndex: number) => (
                <td
                  key={cellIndex}
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    border: "1px solid #ddd",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #0070f3",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select one</p>
      </div>

      {file && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontSize: "1.2rem", color: "#333" }}>
            File Uploaded: {file.name}
          </p>

          <div
            style={{
              backgroundColor: "#f7f7f7",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <button
              style={{
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "0.5rem",
              }}
              onClick={() => fetchData("head")}
            >
              Option 1 (Head)
            </button>

            <button
              style={{
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => fetchData("tail")}
            >
              Option 2 (Tail)
            </button>
          </div>
        </div>
      )}

      {result && renderTable()}
    </div>
  );
};

export default UploadComponent;
