import { useEffect, useRef } from "react";
import { IChartApi, ISeriesApi, AreaData } from "lightweight-charts";

interface Props {
  chart: IChartApi;
  start: number;
  end: number;
}

export default function ResultHighlight({ chart, start, end }: Props) {
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    const series = chart.addAreaSeries({
      lineColor: "rgba(240,185,11,0)",
      topColor: "rgba(240,185,11,0.25)",
      bottomColor: "rgba(240,185,11,0.25)",
      priceLineVisible: false,
      lastValueVisible: false,
    });

    series.setData([
      { time: start / 1000, value: 1 },
      { time: end / 1000, value: 1 },
    ] as AreaData[]);

    seriesRef.current = series;

    return () => {
      chart.removeSeries(series);
    };
  }, [chart, start, end]);

  return null;
}
