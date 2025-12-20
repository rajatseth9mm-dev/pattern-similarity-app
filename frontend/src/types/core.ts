export type AppMode = "CHART" | "RESULTS";

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface PatternMatch {
  startTime: number;
  endTime: number;
  similarity: number;
}
