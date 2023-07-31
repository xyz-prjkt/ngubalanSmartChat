import dotenv from "dotenv";
import fs from "fs";
import piZip from "pizzip";
import docxTemplater from "docxtemplater";
import { checkMkDir } from "../utils/commonUtils.js";

export default async function docsGenerate(data) {
  dotenv.config();

  checkMkDir(`${process.env.DATA_DIR}${data.skType}`);
  checkMkDir(`${process.env.DATA_DIR}`);

  const template = await fs.readFileSync(`./templates/${data.skType}.docx`);
  const zip = new piZip(template);
  const doc = new docxTemplater().loadZip(zip);

  if (data.skType === "SKTM") {
    const docData = {
      noReg: data.noReg,
      nama: data.nama,
      nik: data.nik,
      namaKepala: data.namaKepala,
      noKK: data.noKK,
      ttl: data.ttl,
      agama: data.agama,
      bekerja: data.bekerja,
      alamat: data.alamat,
      tglSurat: data.tglSurat,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKIK") {
    const docData = {
      namaOrtu: data.namaOrtu,
      ttlOrtu: data.ttlOrtu,
      alamatOrtu: data.alamatOrtu,
      nikOrtu: data.nikOrtu,
      nama: data.nama,
      ttl: data.ttl,
      alamat: data.alamat,
      nik: data.nik,
      destination: data.destination,
      tglSurat: data.tglSurat,
      noReg: data.noReg,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  }
  const filePath = `${process.env.DATA_DIR}${data.skType}/${data.filename}`;
  const generatedDocument = doc.getZip().generate({ type: "nodebuffer" });
  fs.writeFileSync(filePath, await generatedDocument);
}
