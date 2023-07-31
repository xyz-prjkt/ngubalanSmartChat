import dotenv from "dotenv";
import fs from "fs";
import piZip from "pizzip";
import docxTemplater from "docxtemplater";
import { checkMkDir } from "../../utils/commonUtils.js";

export default async function sktmGenerate(
  filename,
  skType,
  noreg,
  nama,
  nik,
  namaKepala,
  noKK,
  ttl,
  agama,
  bekerja,
  alamat,
  tglSurat
) {
  dotenv.config();

  checkMkDir(`${process.env.DATA_DIR}${skType}`);
  checkMkDir(`${process.env.DATA_DIR}`);

  const template = await fs.readFileSync("./templates/SKTM.docx");
  const zip = new piZip(template);
  const doc = new docxTemplater().loadZip(zip);

  const data = {
    noReg: noreg,
    nama: nama,
    nik: nik,
    namaKepala: namaKepala,
    noKK: noKK,
    ttl: ttl,
    agama: agama,
    bekerja: bekerja,
    alamat: alamat,
    tglSurat: tglSurat,
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
