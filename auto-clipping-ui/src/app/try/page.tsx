'use client';

import { useState } from 'react';
import DropzoneUploader from '@/components/TryItSection';

export default function TryPage() {
const [uploadedFile, setUploadedFile] = useState<string | null>(null);
const [minDuration, setMinDuration] = useState(5);
const [maxDuration, setMaxDuration] = useState(30);
const [keywordThreshold, setKeywordThreshold] = useState(1);
const [maxGap, setMaxGap] = useState(1.5);
const [isProcessing, setIsProcessing] = useState(false);
const [status, setStatus] = useState<string | null>(null);

const handleGenerate = async () => {
if (!uploadedFile) return;

setIsProcessing(true);
setStatus('Generating clips...');

const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fileName: uploadedFile,
    minDuration,
    maxDuration,
    keywordThreshold,
    maxGap,
  }),
});

const data = await response.json();
setIsProcessing(false);

if (response.ok) {
  setStatus(`✅ Success: ${data.message}`);
} else {
  setStatus(`❌ Error: ${data.error}`);
}
};

return (
<main className="min-h-screen p-6 bg-background text-foreground">
<h1 className="text-3xl font-bold text-center mb-6">Upload a Video</h1>

  <div className="max-w-xl mx-auto">
    <DropzoneUploader onUploadSuccess={setUploadedFile} />

    {uploadedFile && (
      <div className="mt-6 p-4 border rounded shadow bg-white text-black">
        <h2 className="text-xl font-semibold mb-4">Clipping Settings</h2>

        <div className="space-y-3">
          <label className="block">
            Min Duration (sec):
            <input
              type="number"
              value={minDuration}
              min={1}
              max={maxDuration}
              onChange={(e) => setMinDuration(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>

          <label className="block">
            Max Duration (sec):
            <input
              type="number"
              value={maxDuration}
              min={minDuration}
              onChange={(e) => setMaxDuration(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>

          <label className="block">
            Keyword Threshold:
            <input
              type="number"
              value={keywordThreshold}
              min={0}
              onChange={(e) => setKeywordThreshold(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>

          <label className="block">
            Max Gap (sec):
            <input
              type="number"
              step="0.1"
              value={maxGap}
              onChange={(e) => setMaxGap(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>

          <button
            onClick={handleGenerate}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Generate Clips'}
          </button>
        </div>

        {status && <p className="mt-4 text-sm">{status}</p>}
      </div>
    )}
  </div>
</main>
);
}