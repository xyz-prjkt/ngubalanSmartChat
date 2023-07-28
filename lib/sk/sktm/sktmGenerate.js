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

  // Bookman Old Style
  // 11
  const fontRegularBytes = fs.readFileSync("./templates/fonts/BOOKOS.TTF");
  const fontBoldBytes = fs.readFileSync("./templates/fonts/BOOKOSB.TTF");
  const bookmanRegular = await pdfDoc.embedFont(fontRegularBytes);
  const bookmanBold = await pdfDoc.embedFont(fontBoldBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // NOREG (282, 604)
  firstPage.drawText(noreg.toString(), {
    x: 282,
    y: 600,
    size: 11,
    font: bookmanRegular,
  });
  // NAME (278, 539),
  firstPage.drawText(nama, { x: 282, y: 535, size: 11, font: bookmanBold });
  // NIK (278, 526),
  // 16 Digits
  firstPage.drawText(nik, { x: 282, y: 522, size: 11, font: bookmanRegular });
  // TTL (278, 514),
  firstPage.drawText(ttl, { x: 282, y: 509, size: 11, font: bookmanRegular });
  // WNI (278, 502),
  firstPage.drawText("WNI", { x: 282, y: 496, size: 11, font: bookmanRegular });
  // AGAMA (278, 487),
  firstPage.drawText(agama, { x: 282, y: 483, size: 11, font: bookmanRegular });
  // PEKERJAAN (278, 475),
  firstPage.drawText(pekerjaan, {
    x: 282,
    y: 470,
    size: 11,
    font: bookmanRegular,
  });
  // TEMPAT TINGGAL (278, 460)
  firstPage.drawText(tempatTinggal, {
    x: 282,
    y: 457,
    size: 11,
    font: bookmanRegular,
  });
  // TGL SURAT (454, 320)
  firstPage.drawText(tglSurat, {
    x: 454,
    y: 317,
    size: 11,
    font: bookmanRegular,
  });

  fs.writeFileSync(
    `${process.env.DATA_DIR}${skType}/${filename}`,
    await pdfDoc.save()
  );
}
