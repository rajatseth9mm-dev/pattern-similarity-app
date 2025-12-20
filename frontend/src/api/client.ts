const API_BASE = "https://YOUR-BACKEND-URL.onrender.com";

export async function uploadCSV(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: form
  });

  if (!res.ok) throw new Error("CSV upload failed");
  return res.json();
}

export async function runSimilarity(payload: any) {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Analysis failed");
  return res.json();
}
