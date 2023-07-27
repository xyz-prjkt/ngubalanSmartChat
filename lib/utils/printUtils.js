import { exec } from "child_process";
import shellquote from "shell-quote";

async function getDefaultPrinter() {
  return new Promise((resolve, reject) => {
    printer.getPrinter((err, defaultPrinter) => {
      if (err) {
        reject(err);
      } else {
        resolve(defaultPrinter.name);
      }
    });
  });
}

async function printDoc(pdfPath, device) {
  const parsePath = shellquote.quote([pdfPath]);

  if (!device) {
    try {
      device = await getDefaultPrinter();
    } catch (err) {
      console.error("Error getting default printer:", err);
      return;
    }
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
