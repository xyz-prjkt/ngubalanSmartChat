import { exec } from "child_process";
import shellquote from "shell-quote";
import printer from "@thiagoelg/node-printer";
import { isWindows, isWindows64, unixToWinCommand } from "./osUtils.js";

async function printDoc(pdfPath, device) {
  let command;

  if (!device) {
    device = printer.getDefaultPrinterName();
  }

  if (isWindows()) {
    const winPath = unixToWinCommand(pdfPath);

    if (isWindows64()) {
      command = `lib\\bin\\SumatraPDF.exe -print-to "${device}" "${winPath}"`;
    } else {
      command = `lib\\bin\\SumatraPDF32.exe -print-to "${device}" "${winPath}"`;
    }
  } else {
    const linuxPath = shellquote.quote([pdfPath]);
    command = `lp -d ${device} ${linuxPath}`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error printing PDF: ${error.message}`);
    } else {
      console.log("PDF printed successfully!");
    }
  });
}

export default printDoc;
