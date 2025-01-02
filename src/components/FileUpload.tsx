import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useSpotifyStore } from '../store/useSpotifyStore';

export function FileUpload() {
  const processFiles = useSpotifyStore((state) => state.processFiles);
  const isProcessing = useSpotifyStore((state) => state.isProcessing);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      processFiles(acceptedFiles);
    },
    [processFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    disabled: isProcessing,
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How to get your Spotify data:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Log on to Spotify from a web browser</li>
          <li>Navigate to <strong>Profile &gt; Account &gt; Account Privacy</strong></li>
          <li>Request <strong>Extended Streaming History</strong></li>
          <li>Wait for the email with the download link</li>
        </ol>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        {isDragActive ? (
          <p className="text-lg">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2">
              {isProcessing
                ? 'Processing files...'
                : 'Drag & drop your Spotify JSON files here'}
            </p>
            <p className="text-sm text-gray-500">
              or click to select files
            </p>
          </div>
        )}
      </div>
    </div>
  );
}