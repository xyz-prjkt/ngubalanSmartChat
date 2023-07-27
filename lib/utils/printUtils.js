import { exec } from "child_process";
import shellquote from "shell-quote";
import printer from "@thiagoelg/node-printer";
import { isWindows, isWindows64, unixToWinCommand } from "./osUtils.js";

async function printDoc(pdfPath, device) {
  const parsePath = shellquote.quote([pdfPath]);
  let command;

  if (!device) {
    device = printer.getDefaultPrinterName();
  }

  if (isWindows()) {
    const winPath = unixToWinCommand(parsePath);

    if (isWindows64()) {
      command = `lib\\bin\\SumatraPDF.exe -print-to "${device}" ${winPath}`;
    } else {
      command = `lib\\bin\\SumatraPDF32.exe -print-to "${device}" ${winPath}`;
    }
  } else {
    command = `lp -d ${device} ${parsePath}`;
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
