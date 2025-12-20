// server/similarityEngine.js

function getScale(candles) {
  const highs = candles.map(c => c.high);
  const lows = candles.map(c => c.low);

  const min = Math.min(...lows);
  const max = Math.max(...highs);
  const range = max - min || 1;

  return { min, range };
}

function normalizeWithScale(candles, scale) {
  return candles.map(c => ({
    open: (c.open - scale.min) / scale.range,
    high: (c.high - scale.min) / scale.range,
    low: (c.low - scale.min) / scale.range,
    close: (c.close - scale.min) / scale.range,
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

function patternDistance(patternA, patternB) {
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

  // 🔒 normalize ONLY ONCE using base pattern scale
  const baseScale = getScale(basePattern);
  const normBase = normalizeWithScale(basePattern, baseScale);

  const results = [];

  for (let i = 0; i <= candles.length - patternLength; i++) {
    // ❌ skip self-match window
    if (i >= startIndex && i <= endIndex) continue;

    const window = candles.slice(i, i + patternLength);

    // ✅ normalize window using BASE scale
    const normWindow = normalizeWithScale(window, baseScale);

    const distance = patternDistance(normBase, normWindow);

    // Convert distance → similarity %
    const similarity = Math.max(0, 100 - distance * 100);

    if (similarity >= similarityThreshold) {
      results.push({
        index: i,
        similarity: similarity.toFixed(2),
      });
    }
  }

  return results
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 50);
}

module.exports = {
  analyzeSimilarity,
};
