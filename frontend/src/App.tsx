import { AppStateProvider, useAppState } from "./state/appState";
import TopBar from "./components/TopBar";
import ChartMode from "./modes/ChartMode";
import ResultsMode from "./modes/ResultsMode";

function AppInner() {
  const { mode } = useAppState();

  return (
    <>
      <TopBar />
      {mode === "CHART" && <ChartMode />}
      {mode === "RESULTS" && <ResultsMode />}
    </>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppInner />
    </AppStateProvider>
  );
}
