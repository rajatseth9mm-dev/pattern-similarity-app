import { useAppState } from "../state/appState";

interface Props {
  onApply: () => void;
  disabled: boolean;
}

export default function SimilarityPanel({ onApply, disabled }: Props) {
  const { similarity, setSimilarity } = useAppState();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#0b0e11",
        borderTop: "1px solid #1e2329",
        padding: 10,
      }}
    >
      <div style={{ fontSize: 12, marginBottom: 6 }}>
        Similarity: {similarity}%
      </div>

      <input
        type="range"
        min={50}
        max={100}
        step={10}
        value={similarity}
        onChange={(e) => setSimilarity(Number(e.target.value))}
        style={{ width: "100%" }}
      />

      <button
        onClick={onApply}
        disabled={disabled}
        style={{
          marginTop: 8,
          width: "100%",
          opacity: disabled ? 0.4 : 1,
        }}
      >
        Apply / Run Analysis
      </button>
    </div>
  );
}
