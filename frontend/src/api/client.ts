const API_BASE = "https://YOUR-BACKEND-URL.onrender.com";

export async function runSimilarity(payload: any) {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Analysis failed");
  return res.json();
}

export async function exportPDF(payload: any) {
  const res = await fetch(`${API_BASE}/export-pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("PDF export failed");

  return await res.blob();
}
