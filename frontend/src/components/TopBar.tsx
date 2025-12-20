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
        padding: "8px 10px",
        background: "#0b0e11",
        borderBottom: "1px solid #222",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <UploadCSV
          onLoaded={(count) => {
            console.log("Loaded candles:", count);
          }}
        />

        <button
          onClick={() => setMode("CHART")}
          style={{
            padding: "6px 10px",
            fontSize: 12,
            background: "#151a1f",
            border: "1px solid #2a2f35",
            borderRadius: 6,
            color: "#eaeaea",
          }}
        >
          Chart
        </button>

        <button
          onClick={() => setMode("RESULTS")}
          style={{
            padding: "6px 10px",
            fontSize: 12,
            background: "#151a1f",
            border: "1px solid #2a2f35",
            borderRadius: 6,
            color: "#eaeaea",
          }}
        >
          Results
        </button>
      </div>

      {/* RIGHT SIDE */}
      <button
        style={{
          padding: "6px 10px",
          fontSize: 12,
          background: "#151a1f",
          border: "1px solid #2a2f35",
          borderRadius: 6,
          color: "#eaeaea",
        }}
      >
        Pattern Select
      </button>
    </div>
  );
}
