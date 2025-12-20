import { createContext, useContext, useState } from "react";
import type { AppMode, PatternMatch } from "../types/core";

interface AppState {
  mode: AppMode;
  setMode: (m: AppMode) => void;
  matches: PatternMatch[];
  setMatches: (m: PatternMatch[]) => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppMode>("CHART");
  const [matches, setMatches] = useState<PatternMatch[]>([]);

  return (
    <AppStateContext.Provider
      value={{ mode, setMode, matches, setMatches }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("AppState missing");
  return ctx;
}
