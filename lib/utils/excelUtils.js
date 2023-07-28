import fs from "fs";
import dotenv from "dotenv";
import { checkFile } from "./commonUtils.js";
import ExcelJS from "exceljs";

dotenv.config();
const filePath = `${process.env.DATA_DIR}databaseSK.xlsx`;

export default function pushToXLSX(sheetName, noReg, userData, filename) {
  const fetchData = [
    noReg,
    userData.nama,
    userData.nik,
    userData.ttl,
    userData.agama,
    userData.bekerja,
    userData.alamat,
    filename,
  ];

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      writeData(sheetName, fetchData);
    } else {
      appendData(sheetName, fetchData);
    }
  });
}

async function appendData(sheetName, data) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);

    const lastRow = worksheet.lastRow || { number: 0 };
    const newRow = worksheet.addRow(data);

    newRow.commit();
    await workbook.xlsx.writeFile(filePath);
    console.log("Data appended successfully.");
  } catch (err) {
    console.error("Error appending data:", err);
  }
}

async function writeData(sheetName, data) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.addRow(data);

    await workbook.xlsx.writeFile(filePath);
    console.log("Data written successfully.");
  } catch (err) {
    console.error("Error writing data:", err);
  }
}

function getCurrentNoReg(skType) {
  if (checkFile(filePath)) {
    console.log("exist");
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx
        .readFile(filePath)
        .then(() => {
          const worksheet = workbook.getWorksheet(skType);
          const lastRow = worksheet.lastRow || { number: 0 };
          const cellValue = worksheet.getCell(lastRow.number, 1).value;
          resolve(cellValue);
        })
        .catch(reject);
    });
  } else {
    console.log("not exist");
    return Promise.resolve(0);
  }
}

async function getNextNoReg(skType) {
  const noReg = parseInt(await getCurrentNoReg(skType)) + 1;
  return noReg;
}

export { getCurrentNoReg, getNextNoReg };
