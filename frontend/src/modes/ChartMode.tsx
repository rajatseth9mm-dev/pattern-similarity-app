import { useEffect, useState } from "react";
import { IChartApi } from "lightweight-charts";
import CandlestickChart from "../components/CandlestickChart";
import TimeframeBar from "../components/TimeframeBar";
import PatternLines from "../components/PatternLines";
import SimilarityPanel from "../components/SimilarityPanel";
import { Candle } from "../types/core";
import { runSimilarity } from "../api/client";
import { useAppState } from "../state/appState";

export default function ChartMode() {
  const [timeframe, setTimeframe] = useState("1m");
  const [candles, setCandles] = useState<Candle[]>([]);
  const [chart, setChart] = useState<IChartApi | null>(null);

  const {
    similarity,
    patternRange,
    setPatternRange,
    setMatches,
    setMode,
  } = useAppState();

  useEffect(() => {
    setCandles([]);
  }, [timeframe]);

  async function applyAnalysis() {
    if (!patternRange) return;

    const payload = {
      timeframe,
      similarity,
      startTime: patternRange.start,
      endTime: patternRange.end,
    };

    const res = await runSimilarity(payload);
    setMatches(res.matches);
    setMode("RESULTS");
  }

  return (
    <>
      <TimeframeBar timeframe={timeframe} onChange={setTimeframe} />

      <CandlestickChart candles={candles} onReady={setChart} />

      {chart && (
        <PatternLines
          chart={chart}
          candles={candles}
          enabled={true}
          onSelect={(a, b) => setPatternRange({ start: a, end: b })}
        />
      )}

      <SimilarityPanel
        onApply={applyAnalysis}
        disabled={!patternRange}
      />
    </>
  );
}
