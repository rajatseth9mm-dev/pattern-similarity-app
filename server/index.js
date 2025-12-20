import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";
import { analyzeSimilarity } from "./similarityEngine.js";
import { generatePDF } from "./pdfGenerator.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

let candles = [];

/**
 * Upload CSV
 */
app.post("/upload-csv", upload.single("file"), (req, res) => {
  candles = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      candles.push({
        time: Number(row.timestamp || row.UTC),
        open: Number(row.open),
        high: Number(row.high),
        low: Number(row.low),
        close: Number(row.close)
      });
    })
    .on("end", () => {
      res.json({ success: true, candles: candles.length });
    });
});

/**
 * Pattern analysis
 */
app.post("/analyze", (req, res) => {
  const { timeframe, start_index, end_index, similarity_threshold } = req.body;

  const result = analyzeSimilarity(
    candles,
    start_index,
    end_index,
    similarity_threshold
  );

  res.json(result);
});

/**
 * PDF export
 */
app.post("/export-pdf", async (req, res) => {
  const filePath = await generatePDF(req.body.matches);
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
