import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { sdk } from "../../lib/sdk";


export default function DropzoneUpload({ onUpload }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleUpload = async () => {
    if (!files.length) return;
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

        const res = await sdk.admin.upload.create({
        files: files, // dit is gewoon de array van File objects uit de dropzone
        });

      if (onUpload) onUpload(res.files[0].url);

      setFiles([]);
      alert("Upload succesvol!");
    } catch (error) {
      console.error(error);
      alert("Er is iets misgegaan bij uploaden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
            isDragActive ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-sm text-gray-700 mt-2">Laat hier los...</p>
          ) : (
            <p className="text-sm text-gray-600 mt-2">Sleep bestanden hierheen of klik om te kiezen</p>
          )}
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {files.map((file, i) => (
              <div key={i} className="w-full h-24 overflow-hidden rounded-xl border">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}

        <div onClick={handleUpload} disabled={!files.length || loading}>
          {loading ? "Uploaden..." : "Uploaden"}
        </div>
      </div>
    </div>
  );
}
