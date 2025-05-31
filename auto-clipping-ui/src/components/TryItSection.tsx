'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

export default function TryItSection() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [minDuration, setMinDuration] = useState(5);
  const [maxDuration, setMaxDuration] = useState(30);
  const [keywordThreshold, setKeywordThreshold] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');

  const handleUpload = async (file: File) => {
    setUploading(true);
    setStatus('');
    setGenerationStatus('');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setStatus(`✅ Uploaded: ${data.fileName}`);
      setUploadedFileName(data.fileName);
    } else {
      setStatus('❌ Failed to upload.');
    }

    setUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'video/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleUpload(acceptedFiles[0]);
      }
    },
  });

  const handleGenerate = async () => {
    if (!uploadedFileName) return;

    setGenerating(true);
    setGenerationStatus('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: uploadedFileName,
        minDuration,
        maxDuration,
        keywordThreshold,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setGenerationStatus('✅ Clips generated successfully!');
    } else {
      setGenerationStatus(`❌ Error: ${data.error || 'Failed to generate clips.'}`);
    }

    setGenerating(false);
  };

  return (
    <section id="try" className="py-24 px-6 text-center bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4">Upload a Video</h2>
        <p className="text-base mb-8 text-gray-300 dark:text-gray-400">
          Select a video file to process and clip automatically.
        </p>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg px-6 py-12 transition-colors cursor-pointer ${
            isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {uploading ? 'Uploading...' : 'Drag & drop your video file here, or click to select one.'}
          </p>
        </div>

        {status && <p className="mt-4 text-sm">{status}</p>}

        {uploadedFileName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 space-y-4 text-left"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Min Duration (sec)</label>
              <input
                type="number"
                value={minDuration}
                onChange={(e) => setMinDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Max Duration (sec)</label>
              <input
                type="number"
                value={maxDuration}
                onChange={(e) => setMaxDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Keyword Threshold</label>
              <input
                type="number"
                value={keywordThreshold}
                onChange={(e) => setKeywordThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full"
            >
              {generating ? 'Generating Clips...' : 'Generate Clips'}
            </button>

            {generationStatus && <p className="text-sm mt-2">{generationStatus}</p>}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
