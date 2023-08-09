import dotenv from "dotenv";
import fs from "fs";
import piZip from "pizzip";
import docxTemplater from "docxtemplater";
import {
  checkMkDir,
  tglSuratFormat,
  tglSuratFormatInc,
} from "../utils/commonUtils.js";

export default async function docsGenerate(data) {
  dotenv.config();

  checkMkDir(`${process.env.DATA_DIR}${data.skType}`);
  checkMkDir(`${process.env.DATA_DIR}`);

  const template = await fs.readFileSync(`./templates/${data.skType}.docx`);
  const zip = new piZip(template);
  const doc = new docxTemplater().loadZip(zip);

  // TO-DO //
  // SK Izin Keluarga ( DONE )
  // SK Tidak Mampu ( DONE )
  // SK Membeli Solar ( DONE )
  // SK Catatan Kepolisian ( DONE )
  // SK Usaha ( DONE )
  // SK Kehilangan ( DONE )
  // SK Domisili ( DONE )
  // SK Domisili Instansi ( DONE )
  // SK Pengajuan Bank ( DONE )
  // SK Kematian ( DONE )

  if (data.skType === "SKTM") {
    const docData = {
      noReg: data.noReg,
      nama: data.nama,
      nik: data.nik,
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
  } else if (data.skType === "SKMS") {
    let kodeSPBU, lokasiSPBU, tglBerlaku;
    if (data.lokasiSPBU.toLowerCase() === "karangtalun") {
      kodeSPBU = "54.662.27";
      lokasiSPBU = "Desa Karangtalun Kecamatan Kalidawir";
      tglBerlaku = `${tglSuratFormat()} s/d ${tglSuratFormatInc(1)} `;
    } else if (data.lokasiSPBU.toLowerCase() === "selorejo") {
      kodeSPBU = "54.662.29";
      lokasiSPBU = "Desa Selorejo Kecamatan Ngunut";
      tglBerlaku = `${tglSuratFormat()} s/d ${tglSuratFormatInc(1)} `;
    }
    const docData = {
      noReg: data.noReg,
      nama: data.nama,
      ttl: data.ttl,
      nik: data.nik,
      alamat: data.alamat,
      usaha: data.usaha,
      jenisAlat: data.jenisAlat,
      jumlahAlat: data.jumlahAlat,
      fungsiAlat: data.fungsiAlat,
      jenisBBM: data.jenisBBM,
      kodeSPBU: kodeSPBU,
      lokasiSPBU: lokasiSPBU,
      tglBerlaku: tglBerlaku,
      tglSurat: data.tglSurat,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKDI") {
    const docData = {
      nama: data.nama,
      alamat: data.alamat,
      tglSurat: data.tglSurat,
      noReg: data.noReg,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKD") {
    const docData = {
      nama: data.nama,
      nik: data.nik,
      ttl: data.ttl,
      agama: data.agama,
      kelamin: data.kelamin,
      status: data.status,
      pekerjaan: data.pekerjaan,
      alamat: data.alamat,
      tglSurat: data.tglSurat,
      noReg: data.noReg,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKU") {
    const docData = {
      nama: data.nama,
      nik: data.nik,
      ttl: data.ttl,
      kelamin: data.kelamin,
      alamat: data.alamat,
      agama: data.agama,
      status: data.status,
      pendidikan: data.pendidikan,
      pekerjaan: data.pekerjaan,
      usaha: data.usaha,
      tglSurat: data.tglSurat,
      noReg: data.noReg,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKK") {
    const docData = {
      nama: data.nama,
      jenisKelamin: data.jenisKelamin,
      alamat: data.alamat,
      umur: data.umur,
      hariMeninggal: data.hariMeninggal,
      tanggalMeninggal: data.tanggalMeninggal,
      lokasiMeninggal: data.lokasiMeninggal,
      sebab: data.sebab,
      tglSurat: data.tglSurat,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKPB") {
    const docData = {
      nama: data.nama,
      nik: data.nik,
      ttl: data.ttl,
      kelamin: data.kelamin,
      alamat: data.alamat,
      agama: data.agama,
      status: data.status,
      pendidikan: data.pendidikan,
      pekerjaan: data.pekerjaan,
      usaha: data.usaha,
      bank: data.bank,
      tglSurat: data.tglSurat,
      noReg: data.noReg,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKHIL") {
    const docData = {
      nama: data.nama,
      nik: data.nik,
      ttl: data.ttl,
      kelamin: data.kelamin,
      alamat: data.alamat,
      agama: data.agama,
      status: data.status,
      pendidikan: data.pendidikan,
      pekerjaan: data.pekerjaan,
      hilang: data.hilang,
      keterangan: data.keterangan,
      tglSurat: data.tglSurat,
      noReg: data.noReg,
    };
    doc.setData(docData);
    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering template:", error);
    }
  } else if (data.skType === "SKCK") {
    const docData = {
      nama: data.nama,
      nik: data.nik,
      ttl: data.ttl,
      agama: data.agama,
      kelamin: data.kelamin,
      alamat: data.alamat,
      status: data.status,
      pendidikan: data.pendidikan,
      pekerjaan: data.pekerjaan,
      keperluan: data.keperluan,
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
