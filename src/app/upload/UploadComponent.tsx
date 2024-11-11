// app/upload/UploadComponent.tsx
"use client";

import { useDropzone, DropzoneOptions } from "react-dropzone"; // Import DropzoneOptions
import { useState } from "react";

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);

  // Define onDrop and cast it to the correct type inline
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  // Use DropzoneOptions type to type the options properly
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Add this property
    onDragEnter: () => {}, // Add this property
    onDragOver: () => {}, // Add this property
    onDragLeave: () => {}, // Add this property
  } as DropzoneOptions); // Proper typing for the DropzoneOptions

  return (
    <div>
  <div
        {...getRootProps()}
        style={{ border: "2px dashed #0070f3", padding: "2rem", textAlign: "center" }}
      >
        {/* Explicitly type getInputProps to avoid issues */}
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
        <p>Drag & drop a file here, or Click to select one</p>
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
        >
          Option 1
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
        >
          Option 2
        </button>
      </div>
    </div>
  )}
</div>
  );
};

export default UploadComponent;
