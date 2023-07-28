import fs from "fs";

function dateTimeFormat() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const customFormat = `${hours}${minutes}${day}${month}${year}${seconds}`;

  return customFormat;
}

function tglSuratFormat() {
  const tanggal = new Date();
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "November",
    "Desember",
  ];
  return `${tanggal.getDate()} ${
    namaBulan[tanggal.getMonth()]
  } ${tanggal.getFullYear()}`;
}

function containsNumeric(str) {
  return /\d/.test(str);
}

function checkMkDir(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}

export { dateTimeFormat, tglSuratFormat, containsNumeric, checkMkDir };
