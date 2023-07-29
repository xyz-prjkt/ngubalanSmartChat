import http from "http";
import fs from "fs";
import ejs from "ejs";
import { tglSuratFormat } from "../utils/commonUtils.js";
import pushToXLSX, { getNextNoReg } from "../utils/excelUtils.js";
import sktmGenerate from "../sk/sktm/sktmGenerate.js";
import printDoc from "../utils/printUtils.js";
import { client } from "../../mainClient.js";

const port = 3000;
const hostname = "localhost";

let postedData = [];

export default function clientAPI() {
  readDataFromFile();
  const server = http.createServer();

  server.on("request", (req, res) => {
    if (req.method === "GET" && req.url === "/") {
      fs.readFile("index.ejs", "utf8", (err, content) => {
        if (err) {
          console.error("Error reading index.ejs:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          const renderedHTML = ejs.render(content, { postedData });
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(renderedHTML);
        }
      });
    } else if (req.method === "POST" && req.url === "/sendData") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const jsonData = JSON.parse(body);
          const allData = [jsonData[0], jsonData[1], jsonData[2], jsonData[3]];

          postedData.push(allData);
          saveDataToFile();

          res.setHeader("X-Reload-Page", "true");
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Data received and update successfully!");
        } catch (error) {
          console.error("Error parsing JSON data:", error);
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Invalid JSON data!");
        }
      });
    } else if (req.method === "POST" && req.url === "/genDoc") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        try {
          console.log("Printing Data");
          const jsonData = JSON.parse(body);
          const filename = `${jsonData.skType}_${jsonData.nama}_${jsonData.datetime}.pdf`;
          const noReg = await getNextNoReg(jsonData.skType);
          await sktmGenerate(
            filename,
            jsonData.skType,
            noReg,
            jsonData.nama,
            jsonData.nik,
            jsonData.ttl,
            jsonData.agama,
            jsonData.bekerja,
            jsonData.alamat,
            tglSuratFormat()
          );
          pushToXLSX(jsonData.skType, noReg, jsonData, filename);
          printDoc(`${process.env.DATA_DIR}${jsonData.skType}/${filename}`);
        } catch (error) {
          console.log(error);
        }
      });
    } else if (req.method === "DELETE" && req.url.startsWith("/deleteData/")) {
      const dataId = req.url.split("/")[2];
      if (!dataId || isNaN(dataId)) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid data ID");
        return;
      }

      const idToDelete = parseInt(dataId, 10);
      if (idToDelete < 0 || idToDelete >= postedData.length) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Data not found");
      } else {
        postedData.splice(idToDelete, 1);
        saveDataToFile();
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Data deleted successfully!");
      }
    } else if (req.method === "POST" && req.url === "/sendMsg") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        try {
          const jsonData = JSON.parse(body);
          client.sendMessage(jsonData.notelp, jsonData.msg);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

export function sendData(data) {
  const jsonDataString = JSON.stringify(data);
  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/sendData",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": jsonDataString.length,
    },
  };

  const req = http.request(options, (res) => {
    res.setEncoding("utf8");

    let responseData = "";

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      console.log("Response from server:", responseData);
    });
  });

  req.on("error", (error) => {
    console.error("Error sending request:", error);
  });

  req.write(jsonDataString);
  req.end();
}

export function saveDataToFile() {
  fs.writeFile(
    `${process.env.DATA_DIR}/dbMain.json`,
    JSON.stringify(postedData),
    (err) => {
      if (err) {
        console.error("Error saving data to file:", err);
      } else {
        console.log("Data saved to file successfully!");
      }
    }
  );
}

export function readDataFromFile() {
  fs.readFile(`${process.env.DATA_DIR}/dbMain.json`, "utf8", (err, data) => {
    if (err) {
      saveDataToFile();
    } else {
      try {
        postedData = JSON.parse(data);
        console.log("Data loaded from file successfully!");
      } catch (error) {
        console.error("Error parsing data from file:", error);
      }
    }
  });
}
