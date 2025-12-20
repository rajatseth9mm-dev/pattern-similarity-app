const PDFDocument = require("pdfkit");
const { createCanvas } = require("canvas");

function drawCandlestickChart(candles) {
  const WIDTH = 1600;
  const HEIGHT = 800;
  const PAD = 80;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0b0e11";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const prices = candles.flatMap(c => [c.high, c.low]);
  const max = Math.max(...prices);
  const min = Math.min(...prices);

  const scaleY = p =>
    HEIGHT - PAD - ((p - min) / (max - min)) * (HEIGHT - PAD * 2);

  const candleW = (WIDTH - PAD * 2) / candles.length;

  candles.forEach((c, i) => {
    const x = PAD + i * candleW + candleW / 2;
    const openY = scaleY(c.open);
    const closeY = scaleY(c.close);
    const highY = scaleY(c.high);
    const lowY = scaleY(c.low);

    const bullish = c.close >= c.open;
    ctx.strokeStyle = bullish ? "#26a69a" : "#ef5350";
    ctx.fillStyle = bullish ? "#26a69a" : "#ef5350";

    // Wick
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.stroke();

    // Body
    const bodyTop = Math.min(openY, closeY);
    const bodyH = Math.max(Math.abs(openY - closeY), 1);
    ctx.fillRect(x - candleW * 0.3, bodyTop, candleW * 0.6, bodyH);
  });

  return canvas.toBuffer("image/png");
}

function generatePdf(res, matches, candles) {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 20
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=pattern-matches.pdf"
  );

  doc.pipe(res);

  matches.forEach((m, i) => {
    const segment = candles.filter(
      c => c.time >= m.startTime && c.time <= m.endTime
    );

    if (!segment.length) return;

    if (i > 0) doc.addPage();

    doc.fontSize(14).text(`Similarity: ${m.similarity}%`, 30, 30);

    const img = drawCandlestickChart(segment);
    doc.image(img, 30, 60, { width: 780 });
  });

  doc.end();
}

module.exports = { generatePdf };
