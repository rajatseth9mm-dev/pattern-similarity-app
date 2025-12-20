import { useEffect, useRef } from "react";
import { IChartApi, ISeriesApi, LineData } from "lightweight-charts";
import { Candle } from "../types/core";

interface Props {
  chart: IChartApi;
  candles: Candle[];
  enabled: boolean;
  onSelect: (start: number, end: number) => void;
}

export default function PatternLines({
  chart,
  candles,
  enabled,
  onSelect,
}: Props) {
  const lineA = useRef<ISeriesApi<"Line"> | null>(null);
  const lineB = useRef<ISeriesApi<"Line"> | null>(null);
  const active = useRef<"A" | "B" | null>(null);

  useEffect(() => {
    if (!enabled || candles.length === 0) return;

    const minT = candles[0].time / 1000;
    const maxT = candles[candles.length - 1].time / 1000;

    const makeLine = () =>
      chart.addLineSeries({
        color: "#f0b90b",
        lineWidth: 1,
        priceLineVisible: false,
        lastValueVisible: false,
      });

    lineA.current = makeLine();
    lineB.current = makeLine();

    const setLine = (series: ISeriesApi<"Line">, t: number) => {
      const data: LineData[] = [
        { time: t, value: 0 },
        { time: t, value: 1 },
      ];
      series.setData(data);
    };

    setLine(lineA.current, minT);
    setLine(lineB.current, maxT);

    const handleClick = (param: any) => {
      if (!param?.time) return;
      const t = param.time as number;

      const distA = Math.abs(
        t - (lineA.current?.getData()?.[0]?.time as number)
      );
      const distB = Math.abs(
        t - (lineB.current?.getData()?.[0]?.time as number)
      );

      active.current = distA < distB ? "A" : "B";
    };

    const handleMove = (param: any) => {
      if (!active.current || !param?.time) return;
      const t = param.time as number;
      const snapped =
        candles.reduce((prev, c) =>
          Math.abs(c.time / 1000 - t) <
          Math.abs(prev - t)
            ? c.time / 1000
            : prev,
        candles[0].time / 1000);

      if (active.current === "A" && lineA.current)
        setLine(lineA.current, snapped);
      if (active.current === "B" && lineB.current)
        setLine(lineB.current, snapped);

      const a = lineA.current!.getData()[0].time as number;
      const b = lineB.current!.getData()[0].time as number;
      onSelect(Math.min(a, b) * 1000, Math.max(a, b) * 1000);
    };

    const handleUp = () => {
      active.current = null;
    };

    chart.subscribeClick(handleClick);
    chart.subscribeCrosshairMove(handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      chart.unsubscribeClick(handleClick);
      chart.unsubscribeCrosshairMove(handleMove);
      window.removeEventListener("mouseup", handleUp);
      chart.removeSeries(lineA.current!);
      chart.removeSeries(lineB.current!);
    };
  }, [enabled, candles, chart, onSelect]);

  return null;
        }
