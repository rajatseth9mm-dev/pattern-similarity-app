import { createContext, useContext, useState } from "react";
import type { AppMode, PatternMatch } from "../types/core";

interface AppState {
  mode: AppMode;
  setMode: (m: AppMode) => void;

  matches: PatternMatch[];
  setMatches: (m: PatternMatch[]) => void;

  similarity: number;
  setSimilarity: (v: number) => void;

  patternRange: { start: number; end: number } | null;
  setPatternRange: (r: { start: number; end: number } | null) => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppMode>("CHART");
  const [matches, setMatches] = useState<PatternMatch[]>([]);
  const [similarity, setSimilarity] = useState(80);
  const [patternRange, setPatternRange] = useState<{
    start: number;
    end: number;
  } | null>(null);

  return (
    <AppStateContext.Provider
      value={{
        mode,
        setMode,
        matches,
        setMatches,
        similarity,
        setSimilarity,
        patternRange,
        setPatternRange,
      }}
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
