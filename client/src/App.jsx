import { useState } from "react";

const BACKEND_URL = "https://pattern-similarity-app.onrender.com";

export default function App() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus("Uploading CSV...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BACKEND_URL}/upload-csv`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadStatus(`CSV uploaded. Candles loaded: ${data.candles}`);
    } catch (err) {
      setUploadStatus("CSV upload failed");
    }
  }

  async function runAnalysis() {
    setLoading(true);
    setAnalysisResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timeframe: "15m",
          start_index: 1200,
          end_index: 1240,
          similarity_threshold: 82,
        }),
      });

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      setAnalysisResult("Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>Pattern Similarity App (TEST MODE)</h2>

      <div style={{ marginBottom: 12 }}>
        <input type="file" accept=".csv" onChange={uploadCSV} />
        <div>{uploadStatus}</div>
      </div>

      <button onClick={runAnalysis} disabled={loading}>
        {loading ? "Running..." : "Run Analysis"}
      </button>

      <pre style={{ marginTop: 12 }}>
        {analysisResult
          ? JSON.stringify(analysisResult, null, 2)
          : "No analysis yet"}
      </pre>
    </div>
  );
}
