export function analyzeSimilarity(candles, start, end, threshold) {
  const pattern = candles.slice(start, end);

  const normalize = (arr) => {
    const base = arr[0].close;
    return arr.map(c => (c.close - base) / base);
  };

  const baseVec = normalize(pattern);
  const matches = [];

  for (let i = 0; i + pattern.length < candles.length; i++) {
    const window = candles.slice(i, i + pattern.length);
    const vec = normalize(window);

    let score = 0;
    for (let j = 0; j < vec.length; j++) {
      score += 1 - Math.abs(vec[j] - baseVec[j]);
    }

    const similarity = (score / vec.length) * 100;

    if (similarity >= threshold) {
      matches.push({
        index: i,
        similarity: similarity.toFixed(2)
      });
    }
  }

  return { matches };
}
