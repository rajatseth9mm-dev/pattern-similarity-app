// server/index.js

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");

const { analyzeSimilarity } = require("./similarityEngine");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

let candles = [];

app.get("/", (req, res) => {
  res.send("Pattern Similarity Backend Running");
});

app.post("/upload-csv", upload.single("file"), (req, res) => {
  candles = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const timestamp =
        Number(row.timestamp || row.time || row.UTC);

      candles.push({
        time: timestamp,
        open: Number(row.open),
        high: Number(row.high),
        low: Number(row.low),
        close: Number(row.close),
      });
    })
    .on("end", () => {
      fs.unlinkSync(req.file.path);
      res.json({ candles: candles.length });
    });
});

app.post("/analyze", (req, res) => {
  if (!candles.length) {
    return res.status(400).json({ error: "No CSV uploaded" });
  }

  const { timeframe, start_index, end_index, similarity_threshold } = req.body;

  const matches = analyzeSimilarity({
    candles,
    startIndex: start_index,
    endIndex: end_index,
    similarityThreshold: similarity_threshold,
  });

  res.json({ matches });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
