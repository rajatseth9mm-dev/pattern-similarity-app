import { API_BASE } from "../config";
import { useAppState } from "../state/appState";

export default function UploadCSV() {
  const { setCandles } = useAppState();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    await fetch(`${API_BASE}/upload-csv`, {
      method: "POST",
      body: form,
    });

    // fetch candles back
    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start_index: 0,
        end_index: 0,
        similarity_threshold: 0,
      }),
    });

    const data = await res.json();
    setCandles(data.baseCandles || []);
  }

  return (
    <label
      style={{
        padding: "6px 10px",
        background: "#151a1f",
        borderRadius: 6,
        fontSize: 12,
        cursor: "pointer",
        border: "1px solid #2a2f35",
      }}
    >
      Upload CSV
      <input
        type="file"
        accept=".csv"
        hidden
        onChange={handleUpload}
      />
    </label>
  );
}
