import PDFDocument from "pdfkit";
import fs from "fs";

export function generatePDF(matches) {
  return new Promise((resolve) => {
    const path = "matches.pdf";
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(18).text("Pattern Matches", { align: "center" });
    doc.moveDown();

    matches.forEach((m, i) => {
      doc.fontSize(12).text(
        `${i + 1}. Index: ${m.index}, Similarity: ${m.similarity}%`
      );
    });

    doc.end();
    resolve(path);
  });
}
