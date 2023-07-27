import XLSX from "xlsx";
import fs from "fs";
import dotenv from "dotenv";

export default function xlsxUtils() {}

dotenv.config();
const filename = `${process.env.DATA_DIR}dbMain.xlsx`;

const newData = [
  ["Jody", 28],
  ["Yuan", 32],
];

function createNewXLSX(data) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
}

function appendToXLSX(data) {
  const workbook = XLSX.readFile(filename);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const lastRow = XLSX.utils.decode_range(worksheet["!ref"]).e.r + 1;
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellAddress = XLSX.utils.encode_cell({
        r: lastRow + rowIndex,
        c: cellIndex,
      });
      worksheet[cellAddress] = { t: "s", v: cell }; // 's' for string type
    });
  });
  XLSX.writeFile(workbook, filename);
}

// fs.access(filename, fs.constants.F_OK, (err) => {
//   if (err) {
//     console.log("new");
//     createNewXLSX(newData);
//   } else {
//     console.log("append");
//     appendToXLSX(newData);
//   }
// });

console.log(filename);
createNewXLSX(newData);
