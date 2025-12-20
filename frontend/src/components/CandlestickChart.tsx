import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  ISeriesApi,
  CandlestickData,
} from "lightweight-charts";
import { Candle } from "../types/core";

interface Props {
  candles: Candle[];
}

export default function CandlestickChart({ candles }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0b0e11" },
        textColor: "#eaecef",
      },
      grid: {
        vertLines: { color: "#1e2329" },
        horzLines: { color: "#1e2329" },
      },
      rightPriceScale: {
        borderColor: "#1e2329",
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: "#1e2329",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
      },
      handleScroll: true,
      handleScale: true,
      autoSize: true,
    });

    const series = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderVisible: false,
    });

    seriesRef.current = series;

    return () => {
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    const data: CandlestickData[] = candles.map((c) => ({
      time: (c.time / 1000) as any, // normalized to seconds
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    seriesRef.current.setData(data);
  }, [candles]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "calc(100vh - 40px)",
      }}
    />
  );
            }
