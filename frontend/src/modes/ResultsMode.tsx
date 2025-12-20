import { useState } from "react";
import { IChartApi } from "lightweight-charts";
import { useAppState } from "../state/appState";
import CandlestickChart from "../components/CandlestickChart";
import PatternGallery from "../components/PatternGallery";
import ResultHighlight from "../components/ResultHighlight";
import PdfExportButton from "../components/PdfExportButton";
import { Candle, PatternMatch } from "../types/core";

export default function ResultsMode() {
  const { matches } = useAppState();
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [active, setActive] = useState<PatternMatch | null>(null);
  const [candles] = useState<Candle[]>([]);
  const timeframe = "1h"; // already locked by analysis step

  function handleSelect(m: PatternMatch) {
    setActive(m);
    chart?.timeScale().setVisibleRange({
      from: m.startTime / 1000,
      to: m.endTime / 1000,
    });
  }

  return (
    <>
      <CandlestickChart candles={candles} onReady={setChart} />

      {chart && active && (
        <ResultHighlight
          chart={chart}
          start={active.startTime}
          end={active.endTime}
        />
      )}

      <PatternGallery matches={matches} onSelect={handleSelect} />

      <PdfExportButton timeframe={timeframe} matches={matches} />
    </>
  );
}
