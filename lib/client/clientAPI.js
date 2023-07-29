import express from "express";
import http from 'http';
import fs from "fs";
import ejs from "ejs";
import { tglSuratFormat } from "../utils/commonUtils.js";
import pushToXLSX, { getNextNoReg } from "../utils/excelUtils.js";
import sktmGenerate from "../sk/sktm/sktmGenerate.js";
import printDoc from "../utils/printUtils.js";
import { client } from "../../mainClient.js";

const app = express();
const port = 3000;

let postedData = [];

export default function clientAPI() {
  readDataFromFile();

  app.set("views", "./"); // Set the views directory to the current directory
  app.set("view engine", "ejs"); // Set EJS as the view engine

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Middleware to serve static files from the 'public' folder
  app.use(express.static("public"));

  // Function to render the EJS template with postedData
  function renderIndex(res) {
    fs.readFile("index.ejs", "utf8", (err, content) => {
      if (err) {
        console.error("Error reading index.ejs:", err);
        res.status(500).send("Internal Server Error");
      } else {
        const renderedHTML = ejs.render(content, { postedData });
        res.status(200).send(renderedHTML);
      }
    });
  }
  app.get("/", (req, res) => {
    renderIndex(res);
  });

  app.post("/sendData", (req, res) => {
    try {
      console.log(req.body)
      const jsonData = req.body;
      const allData = [jsonData[0], jsonData[1], jsonData[2], jsonData[3]];

      postedData.push(allData);
      saveDataToFile();

      res.setHeader("X-Reload-Page", "true");
      res.status(200).send("Data received and updated successfully!");
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(400).send("Invalid JSON data!");
    }
  });

  app.post("/genDoc", async (req, res) => {
    try {
      console.log("Printing Data");
      const jsonData = req.body;
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
      res.status(200).send("Document generated successfully!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/deleteData/:dataId", (req, res) => {
    const dataId = parseInt(req.params.dataId, 10);
    if (isNaN(dataId) || dataId < 0 || dataId >= postedData.length) {
      res.status(400).send("Invalid data ID");
    } else {
      postedData.splice(dataId, 1);
      saveDataToFile();
      res.status(200).send("Data deleted successfully!");
    }
  });

  app.post("/sendMsg", async (req, res) => {
    try {
      const jsonData = req.body;
      client.sendMessage(jsonData.notelp, jsonData.msg);
      res.status(200).send("Message sent successfully!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
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
