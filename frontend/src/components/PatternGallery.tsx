import { PatternMatch } from "../types/core";

interface Props {
  matches: PatternMatch[];
  onSelect: (m: PatternMatch) => void;
}

export default function PatternGallery({ matches, onSelect }: Props) {
  return (
    <div
      style={{
        padding: 10,
        overflowY: "auto",
        maxHeight: "40vh",
        borderTop: "1px solid #1e2329",
      }}
    >
      {matches.map((m, i) => (
        <div
          key={i}
          onClick={() => onSelect(m)}
          style={{
            padding: 8,
            marginBottom: 6,
            border: "1px solid #2b3139",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: 12 }}>
            Similarity: <b>{m.similarity}%</b>
          </div>
          <div style={{ fontSize: 10, opacity: 0.7 }}>
            {new Date(m.startTime).toUTCString()}
          </div>
        </div>
      ))}
    </div>
  );
}
