import { API_BASE } from "../config";

export default function UploadCSV({
  onLoaded,
}: {
  onLoaded: (count: number) => void;
}) {
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_BASE}/upload-csv`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    onLoaded(data.candles);
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
