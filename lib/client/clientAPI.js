import express from "express";
import axios from "axios";
import fs from "fs";
import ejs from "ejs";
import { client } from "../../mainClient.js";
import { tglSuratFormat } from "../utils/commonUtils.js";
import pushToXLSX, { getNextNoReg } from "../utils/excelUtils.js";
import docsGenerate from "../sk/docsGenerate.js";

const app = express();
const port = 3000;

let postedData = [];

export default function clientAPI() {
  readDataFromFile();

  app.set("views", "./client");
  app.set("view engine", "ejs");

  app.use(express.json());
  app.use(express.static("./client/public"));

  function renderIndex(res) {
    fs.readFile("./client/index.ejs", "utf8", (err, content) => {
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
      const jsonData = req.body;
      const allData = [jsonData[0], jsonData[1], jsonData[2], jsonData[3]];

      postedData.push(allData);
      saveDataToFile();

      client.sendMessage(allData[2], "Data anda sedang kami proses");

      res.setHeader("X-Reload-Page", "true");
      res.status(200).send("Data received and updated successfully!");
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(400).send("Invalid JSON data!");
    }
  });

  app.post("/genDoc", async (req, res) => {
    try {
      const jsonData = req.body;
      const filename = `${jsonData.skType}_${jsonData.nama}_${jsonData.datetime}.docx`;
      const noReg = await getNextNoReg(jsonData.skType);
      if (jsonData.skType === "SKTM") {
        await docsGenerate({
          filename: filename,
          skType: jsonData.skType,
          noReg: noReg,
          nama: jsonData.nama,
          nik: jsonData.nik,
          namaKepala: jsonData.namaKepala,
          noKK: jsonData.noKK,
          ttl: jsonData.ttl,
          agama: jsonData.agama,
          bekerja: jsonData.bekerja,
          alamat: jsonData.alamat,
          tglSurat: tglSuratFormat(),
        });
        pushToXLSX(jsonData.skType, noReg, jsonData, filename);
      } else if (jsonData.skType === "SKIK") {
        await docsGenerate({
          filename: filename,
          skType: jsonData.skType,
          noReg: noReg,
          namaOrtu: jsonData.namaOrtu,
          ttlOrtu: jsonData.ttlOrtu,
          alamatOrtu: jsonData.alamatOrtu,
          nikOrtu: jsonData.nikOrtu,
          nama: jsonData.nama,
          ttl: jsonData.ttl,
          alamat: jsonData.alamat,
          nik: jsonData.nik,
          destination: jsonData.destination,
          tglSurat: tglSuratFormat(),
        });
        pushToXLSX(jsonData.skType, noReg, jsonData, filename);
      }
      res
        .status(200)
        .sendFile(`${process.env.DATA_DIR}/${jsonData.skType}/${filename}`);
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
    method: "POST",
    url: `http://localhost:${port}/sendData`,
    headers: {
      "Content-Type": "application/json",
    },
    data: jsonDataString,
  };

  axios(options)
    .then((response) => {
      console.log("Response from server:", response.data);
    })
    .catch((error) => {
      console.error("Error sending request:", error);
    });
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
