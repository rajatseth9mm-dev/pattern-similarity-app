interface Props {
  timeframe: string;
  onChange: (tf: string) => void;
}

const TFS = ["1m", "5m", "15m", "1h", "4h", "1d"];

export default function TimeframeBar({ timeframe, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        padding: 6,
        borderBottom: "1px solid #1e2329",
        overflowX: "auto",
      }}
    >
      {TFS.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          style={{
            opacity: tf === timeframe ? 1 : 0.5,
            whiteSpace: "nowrap",
          }}
        >
          {tf}
        </button>
      ))}
    </div>
  );
}
