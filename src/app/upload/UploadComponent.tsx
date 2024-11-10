// app/upload/UploadComponent.tsx
"use client";

import { useDropzone } from "react-dropzone";
import { useState } from "react";

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);

  // Define onDrop and cast it to the correct type inline
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  // Pass options inline without explicitly typing DropzoneOptions
  const { getRootProps, getInputProps } = useDropzone({ onDrop } as any);

  return (
    <div>
      <div
        {...getRootProps()}
        style={{ border: "2px dashed #0070f3", padding: "2rem", textAlign: "center" }}
      >
        {/* Apply type assertion to avoid conflicts */}
        <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
        <p>Drag & drop a file here, or click to select one</p>
      </div>
      {file && (
        <div style={{ marginTop: "1rem" }}>
          <p>File Uploaded: {file.name}</p>
          <button style={{ marginRight: "0.5rem" }}>Option 1</button>
          <button>Option 2</button>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
