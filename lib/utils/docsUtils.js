import { PDFDocument } from "pdf-lib";
import dotenv from "dotenv";
import fs from "fs";
import printDoc from "./printUtils.js";

async function createSK(filename, name, work, address) {
  dotenv.config();
  const pdfData = await fs.readFileSync("./templates/SKLurahCamat.pdf");
  const pdfDoc = await PDFDocument.load(pdfData);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  firstPage.drawText(name, { x: 300, y: height / 2 + 300, size: 10 });
  firstPage.drawText(work, { x: 300, y: height / 2 + 310, size: 10 });
  firstPage.drawText(address, { x: 300, y: height / 2 + 320, size: 10 });

  fs.writeFileSync(
    `${process.env.DATA_DIR}SK/${filename}.pdf`,
    await pdfDoc.save()
  );

  printDoc(`${process.env.DATA_DIR}SK/${filename}.pdf`, "L310");
}

export { createSK };
