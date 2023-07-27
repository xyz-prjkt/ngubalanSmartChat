import { exec } from "child_process";
import shellquote from "shell-quote";
import printer from "@thiagoelg/node-printer";

async function printDoc(pdfPath, device) {
  const parsePath = shellquote.quote([pdfPath]);

  if (!device) {
    device = printer.getDefaultPrinterName();
  }

  const command = `lp -d ${device} ${parsePath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error printing PDF: ${error.message}`);
    } else {
      console.log("PDF printed successfully!");
    }
  });
}

export default printDoc;
