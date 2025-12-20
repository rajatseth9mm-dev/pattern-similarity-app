// server/similarityEngine.js

function normalizeCandles(candles) {
  const opens = candles.map(c => c.open);
  const highs = candles.map(c => c.high);
  const lows = candles.map(c => c.low);
  const closes = candles.map(c => c.close);

  const min = Math.min(...lows);
  const max = Math.max(...highs);
  const range = max - min || 1;

  return candles.map(c => ({
    open: (c.open - min) / range,
    high: (c.high - min) / range,
    low: (c.low - min) / range,
    close: (c.close - min) / range,
  }));
}

function candleDistance(a, b) {
  return (
    Math.abs(a.open - b.open) +
    Math.abs(a.high - b.high) +
    Math.abs(a.low - b.low) +
    Math.abs(a.close - b.close)
  );
}

function patternSimilarity(patternA, patternB) {
  let total = 0;
  for (let i = 0; i < patternA.length; i++) {
    total += candleDistance(patternA[i], patternB[i]);
  }
  return total / patternA.length;
}

function analyzeSimilarity({
  candles,
  startIndex,
  endIndex,
  similarityThreshold,
}) {
  const patternLength = endIndex - startIndex;
  const basePattern = candles.slice(startIndex, endIndex);
  const normBase = normalizeCandles(basePattern);

  const results = [];

  for (let i = 0; i <= candles.length - patternLength; i++) {
    // ❌ skip comparing pattern with itself
    if (i >= startIndex && i <= endIndex) continue;

    const window = candles.slice(i, i + patternLength);
    const normWindow = normalizeCandles(window);

    const distance = patternSimilarity(normBase, normWindow);

    // Convert distance → similarity %
    const similarity = Math.max(0, 100 - distance * 100);

    if (similarity >= similarityThreshold) {
      results.push({
        index: i,
        similarity: similarity.toFixed(2),
      });
    }
  }

  // Sort best first, limit results
  return results
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 50);
}

module.exports = {
  analyzeSimilarity,
};
