import UploadCSV from "./UploadCSV";
import { useAppState } from "../state/appState";

export default function TopBar() {
  const { setMode } = useAppState();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        background: "#0b0e11",
        borderBottom: "1px solid #222",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", gap: 8 }}>
        <UploadCSV onLoaded={(n) => alert(`Loaded ${n} candles`)} />
        <button onClick={() => setMode("CHART")}>Chart</button>
        <button onClick={() => setMode("RESULTS")}>Results</button>
      </div>

      {/* RIGHT */}
      <button>Pattern Select</button>
    </div>
  );
}
