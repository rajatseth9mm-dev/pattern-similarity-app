import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);

  async function analyze() {
    const res = await fetch("RENDER_BACKEND_URL/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timeframe: "15m",
        start_index: 1200,
        end_index: 1240,
        similarity_threshold: 82
      })
    });

    setResult(await res.json());
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Pattern Similarity App</h2>
      <button onClick={analyze}>Run Analysis</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
