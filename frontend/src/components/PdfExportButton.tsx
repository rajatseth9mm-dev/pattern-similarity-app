import { exportPDF } from "../api/client";
import { PatternMatch } from "../types/core";

interface Props {
  timeframe: string;
  matches: PatternMatch[];
}

export default function PdfExportButton({ timeframe, matches }: Props) {
  async function handleExport() {
    const blob = await exportPDF({ timeframe, matches });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "pattern-matches.pdf";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      style={{
        width: "100%",
        margin: 10,
        padding: 10,
        background: "#f0b90b",
        color: "#000",
        fontWeight: 600,
      }}
    >
      Download PDF
    </button>
  );
}
