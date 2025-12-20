import { useAppState } from "../state/appState";

export default function TopBar() {
  const { mode, setMode } = useAppState();

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: 8,
        borderBottom: "1px solid #1e2329"
      }}
    >
      <button
        onClick={() => setMode("CHART")}
        style={{ opacity: mode === "CHART" ? 1 : 0.5 }}
      >
        Chart
      </button>

      <button
        onClick={() => setMode("RESULTS")}
        style={{ opacity: mode === "RESULTS" ? 1 : 0.5 }}
      >
        Results
      </button>
    </div>
  );
}
