import fs from "fs";
import dotenv from "dotenv";
import { checkFile } from "./commonUtils.js";
import ExcelJS from "exceljs";

dotenv.config();
const filePath = `${process.env.DATA_DIR}databaseSK.xlsx`;

export default function pushToXLSX(sheetName, noReg, userData, filename) {
  var fetchData;
  const fetchDataMain = [
    noReg,
    sheetName,
    userData.nama,
    userData.nik,
    filename,
  ];
  if (sheetName === "SKTM") {
    fetchData = [
      noReg,
      userData.nama,
      userData.nik,
      userData.ttl,
      userData.agama,
      userData.bekerja,
      userData.alamat,
      filename,
    ];
  } else if (sheetName === "SKIK") {
    fetchData = [
      noReg,
      userData.nama,
      userData.nik,
      userData.alamat,
      userData.destination,
      filename,
    ];
  } else if (sheetName === "SKMS") {
    fetchData = [noReg, userData.nama, userData.nik, userData.alamat, filename];
  } else if (sheetName === "SKDI") {
    fetchData = [noReg, userData.nama, userData.alamat];
  } else if (sheetName === "SKD") {
    fetchData = [
      noReg,
      userData.nama,
      userData.nik,
      userData.ttl,
      userData.alamat,
    ];
  } else if (sheetName === "SKU") {
    fetchData = [
      noReg,
      userData.nama,
      userData.nik,
      userData.ttl,
      userData.alamat,
    ];
  } else if (sheetName === "SKK") {
    fetchData = [
      noReg,
      userData.nama,
      userData.jenisKelamin,
      userData.alamat,
      userData.umur,
      userData.tanggalMeninggal,
      userData.sebab,
    ];
  } else if (sheetName === "SKPB") {
    fetchData = [
      noReg,
      userData.nama,
      userData.ttl,
      userData.kelamin,
      userData.alamat,
      userData.agama,
      userData.status,
      userData.pendidikan,
      userData.pekerjaan,
      userData.usaha,
      userData.bank,
    ];
  } else if (sheetName === "SKHIL") {
    fetchData = [
      noReg,
      userData.nama,
      userData.nik,
      userData.ttl,
      userData.kelamin,
      userData.alamat,
      userData.agama,
      userData.status,
      userData.pendidikan,
      userData.pekerjaan,
      userData.hilang,
      userData.keterangan,
    ];
  } else if (sheetName === "SKCK") {
    fetchData = [
      noReg,
      userData.nama,
      userData.nik,
      userData.noKK,
      userData.namaKepala,
      userData.ttl,
      userData.agama,
      userData.kelamin,
      userData.alamat,
      userData.status,
      userData.pendidikan,
      userData.pekerjaan,
      userData.keperluan,
    ];
  }

  fs.access(filePath, fs.constants.F_OK, async (err) => {
    if (err) {
      if (sheetName != "SKCK") {
        await writeData(sheetName, fetchData, fetchDataMain);
      } else {
        await writeData(sheetName, fetchData, fetchDataMain);
      }
    } else {
      if (sheetName != "SKCK") {
        await appendDataMain(fetchDataMain);
      }
      await appendData(sheetName, fetchData);
    }
  });
}

async function appendDataMain(data) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheetMain = workbook.getWorksheet("SemuaSurat");
    const newRowMain = worksheetMain.addRow(data);

    newRowMain.commit();
    await workbook.xlsx.writeFile(filePath);
    console.log("Data Main appended successfully.");
  } catch (err) {
    console.error("Error appending data main:", err);
  }
}

async function appendData(sheetName, data) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    let worksheet = workbook.getWorksheet(sheetName);

    if (!worksheet) {
      worksheet = workbook.addWorksheet(sheetName);
      const newRow = worksheet.addRow(data);
      newRow.commit();
    } else {
      const newRow = worksheet.addRow(data);
      newRow.commit();
    }

    await workbook.xlsx.writeFile(filePath);
    console.log("Data appended successfully.");
  } catch (err) {
    console.error("Error appending data:", err);
  }
}

async function writeData(sheetName, data, dataMain) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    if (sheetName != "SKCK") {
      const worksheetMain = workbook.addWorksheet("SemuaSurat");
      worksheetMain.addRow(dataMain);
    }
    worksheet.addRow(data);
    await workbook.xlsx.writeFile(filePath);
    console.log("Data written successfully.");
  } catch (err) {
    console.error("Error writing data:", err);
  }
}

function getCurrentNoReg() {
  if (checkFile(filePath)) {
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx
        .readFile(filePath)
        .then(() => {
          const worksheet = workbook.getWorksheet("SemuaSurat");
          const lastRow = worksheet.lastRow || { number: 0 };
          const cellValue = worksheet.getCell(lastRow.number, 1).value;
          resolve(cellValue);
          console.log("No SK" + cellValue);
        })
        .catch(reject);
    });
  } else {
    return Promise.resolve(0);
  }
}

async function getNextNoReg() {
  const noReg = parseInt(await getCurrentNoReg()) + 1;
  return noReg;
}

function getSKCKNoReg() {
  if (checkFile(filePath)) {
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx
        .readFile(filePath)
        .then(() => {
          const worksheet = workbook.getWorksheet("SKCK");
          const lastRow = worksheet.lastRow || { number: 0 };
          const cellValue = worksheet.getCell(lastRow.number, 1).value;
          resolve(cellValue);
          console.log("No SKCK" + cellValue);
        })
        .catch(reject);
    });
  } else {
    return Promise.resolve(0);
  }
}

async function getNextSKCKNoReg() {
  const noReg = parseInt(await getSKCKNoReg()) + 1;
  return noReg;
}

export { getCurrentNoReg, getNextNoReg, getSKCKNoReg, getNextSKCKNoReg };
