import XLSX from "xlsx";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const filePath = `${process.env.DATA_DIR}databaseSK.xlsx`;

export default function pushToXLSX(sheetName, noReg, rowData) {
  const fetchData = [
    noReg,
    rowData.nama,
    rowData.nik,
    rowData.ttl,
    rowData.agama,
    rowData.bekerja,
    rowData.alamat,
  ];

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      writeData(sheetName, fetchData);
    } else {
      appendData(sheetName, fetchData);
    }
  });
}

function appendData(sheetName, data) {
  try {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    const lastRow = range.e.r + 1;

    data.forEach((value, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: lastRow, c: index });
      worksheet[cellAddress] = { t: "s", v: value };
    });

    worksheet["!ref"] = XLSX.utils.encode_range({
      s: { c: 0, r: 0 },
      e: { c: data.length - 1, r: lastRow },
    });

    XLSX.writeFile(workbook, filePath);
    console.log("Data appended successfully.");
  } catch (err) {
    console.error("Error appending data:", err);
  }
}

function writeData(sheetName, data) {
  try {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([data]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, filePath);
    console.log("Data written successfully.");
  } catch (err) {
    console.error("Error writing data:", err);
  }
}

function getCurrentNoReg(skType) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return "0";
    } else {
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[skType];
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      const lastRow = range.e.r;
      const cellAddress = XLSX.utils.encode_cell({ r: lastRow, c: 0 }); // 0 represents column A
      const cellValue = worksheet[cellAddress]
        ? worksheet[cellAddress].v
        : null;
      return cellValue;
    }
  });
}

function getNextNoReg(skType) {
  const noReg = parseInt(getCurrentNoReg(skType)) + 1;
  return noReg;
}

export { getCurrentNoReg, getNextNoReg };
