import { createContext, useContext, useState } from "react";
import type { AppMode } from "../types/core";

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface AppState {
  mode: AppMode;
  setMode: (m: AppMode) => void;

  candles: Candle[];
  setCandles: (c: Candle[]) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppMode>("CHART");
  const [candles, setCandles] = useState<Candle[]>([]);

  return (
    <Ctx.Provider value={{ mode, setMode, candles, setCandles }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Missing AppState");
  return ctx;
}
