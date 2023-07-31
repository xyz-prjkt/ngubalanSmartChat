import dotenv from "dotenv";
import fs from "fs";
import piZip from "pizzip";
import docxTemplater from "docxtemplater";
import { checkMkDir } from "../../utils/commonUtils.js";

export default async function skikGenerate(
  filename,
  skType,
  noreg,
  namaOrtu,
  ttlOrtu,
  alamatOrtu,
  nikOrtu,
  nama,
  ttl,
  alamat,
  nik,
  destination,
  tglSurat
) {
  dotenv.config();

  checkMkDir(`${process.env.DATA_DIR}${skType}`);
  checkMkDir(`${process.env.DATA_DIR}`);

  const template = await fs.readFileSync("./templates/SKIK.docx");
  const zip = new piZip(template);
  const doc = new docxTemplater().loadZip(zip);

  const data = {
    namaOrtu: namaOrtu,
    ttlOrtu: ttlOrtu,
    alamatOrtu: alamatOrtu,
    nikOrtu: nikOrtu,
    nama: nama,
    ttl: ttl,
    alamat: alamat,
    nik: nik,
    destination: destination,
    tglSurat: tglSurat,
    noReg: noreg,
  };

  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    console.error("Error rendering template:", error);
  }

  const filePath = `${process.env.DATA_DIR}${skType}/${filename}`;
  const generatedDocument = doc.getZip().generate({ type: "nodebuffer" });

  fs.writeFileSync(filePath, await generatedDocument);
}
