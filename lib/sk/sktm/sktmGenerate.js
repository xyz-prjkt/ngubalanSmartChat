import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import dotenv from "dotenv";
import fs from "fs";

import { checkMkDir } from "../../utils/commonUtils.js";

export default async function sktmGenerate(
  filename,
  skType,
  noreg,
  nama,
  nik,
  ttl,
  agama,
  pekerjaan,
  tempatTinggal,
  tglSurat
) {
  dotenv.config();

  checkMkDir(`${process.env.DATA_DIR}${skType}`);
  checkMkDir(`${process.env.DATA_DIR}`);

  const pdfData = await fs.readFileSync("./templates/SKTM.pdf");
  const pdfDoc = await PDFDocument.load(pdfData);
  pdfDoc.registerFontkit(fontkit);

  const fontRegularBytes = fs.readFileSync("./templates/fonts/BOOKOS.TTF");
  const fontBoldBytes = fs.readFileSync("./templates/fonts/BOOKOSB.TTF");
  const bookmanRegular = await pdfDoc.embedFont(fontRegularBytes);
  const bookmanBold = await pdfDoc.embedFont(fontBoldBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width } = firstPage.getSize();
  const noRegText = `Nomor : 470/${noreg.toString()}/14.2013/2023`;
  const textWidth = bookmanRegular.widthOfTextAtSize(noRegText, 11);
  const tempatTinggalLines = splitTextIntoLines(
    tempatTinggal,
    280,
    bookmanRegular,
    11
  );
  const tempatTinggalY = 458;

  firstPage.drawText(noRegText, {
    x: (width - textWidth) / 2,
    y: 600,
    size: 11,
    font: bookmanRegular,
  });

  firstPage.drawText(nama, { x: 282, y: 536, size: 11, font: bookmanBold });
  firstPage.drawText(nik, { x: 282, y: 523, size: 11, font: bookmanRegular });
  firstPage.drawText(ttl, { x: 282, y: 510, size: 11, font: bookmanRegular });
  firstPage.drawText("WNI", { x: 282, y: 497, size: 11, font: bookmanRegular });
  firstPage.drawText(agama, { x: 282, y: 484, size: 11, font: bookmanRegular });
  firstPage.drawText(pekerjaan, {
    x: 282,
    y: 471,
    size: 11,
    font: bookmanRegular,
  });
  for (let i = 0; i < tempatTinggalLines.length; i++) {
    const line = tempatTinggalLines[i];
    firstPage.drawText(line, {
      x: 282,
      y: tempatTinggalY - i * 15,
      size: 11,
      font: bookmanRegular,
    });
  }
  firstPage.drawText(tglSurat, {
    x: 454,
    y: 318,
    size: 11,
    font: bookmanRegular,
  });

  fs.writeFileSync(
    `${process.env.DATA_DIR}${skType}/${filename}`,
    await pdfDoc.save()
  );
}

function splitTextIntoLines(text, maxWidth, font, fontSize) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const wordWidth = font.widthOfTextAtSize(word, fontSize);

    if (font.widthOfTextAtSize(currentLine + " " + word, fontSize) < maxWidth) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
