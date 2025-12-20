import { useEffect, useState } from "react";
import CandlestickChart from "../components/CandlestickChart";
import TimeframeBar from "../components/TimeframeBar";
import { Candle } from "../types/core";

/**
 * TEMP: empty candles.
 * Backend wiring happens in Step 4.
 */
export default function ChartMode() {
  const [timeframe, setTimeframe] = useState("1m");
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    // Placeholder — real backend fetch in later step
    setCandles([]);
  }, [timeframe]);

  return (
    <>
      <TimeframeBar timeframe={timeframe} onChange={setTimeframe} />
      <CandlestickChart candles={candles} />
    </>
  );
}
