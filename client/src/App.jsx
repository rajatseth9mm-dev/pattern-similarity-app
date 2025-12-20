import { useState } from "react";

const BACKEND_URL = "https://pattern-similarity-app.onrender.com";

export default function App() {
  const [result, setResult] = useState("Click Run Analysis");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function runAnalysis() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeframe: "15m",
          start_index: 1200,
          end_index: 1240,
          similarity_threshold: 82,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Backend error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult("No CSV uploaded yet (this is expected)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>Pattern Similarity App</h2>

      <button onClick={runAnalysis} disabled={loading}>
        {loading ? "Running..." : "Run Analysis"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          Error: {error}
        </p>
      )}

      <pre style={{ marginTop: 12 }}>
        {typeof result === "string"
          ? result
          : JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}
