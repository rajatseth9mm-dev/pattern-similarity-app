import { useEffect, useState } from "react";
import { IChartApi } from "lightweight-charts";
import CandlestickChart from "../components/CandlestickChart";
import TimeframeBar from "../components/TimeframeBar";
import PatternLines from "../components/PatternLines";
import { Candle } from "../types/core";

export default function ChartMode() {
  const [timeframe, setTimeframe] = useState("1m");
  const [candles, setCandles] = useState<Candle[]>([]);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [patternOn, setPatternOn] = useState(false);

  useEffect(() => {
    setCandles([]);
  }, [timeframe]);

  return (
    <>
      <TimeframeBar timeframe={timeframe} onChange={setTimeframe} />
      <CandlestickChart candles={candles} onReady={setChart} />
      {chart && (
        <PatternLines
          chart={chart}
          candles={candles}
          enabled={patternOn}
          onSelect={(a, b) => {
            // pattern range locked here
          }}
        />
      )}
    </>
  );
}
