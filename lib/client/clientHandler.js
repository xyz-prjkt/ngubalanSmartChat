import { MessageMedia } from "../../mainClient.js";
import {
  containsNumeric,
  dateTimeFormat,
} from "../utils/commonUtils.js";
import pushToXLSX, { getNextNoReg } from "../utils/excelUtils.js";

import sktmDataParser from "../sk/sktm/sktmDataParser.js";
import skikDataParser from "../sk/skik/skikDataParser.js";
import { sendData } from "./clientAPI.js";

export default function clientHandler(client) {
  client.on("message", async (msg) => {
    try {
      let chat = await msg.getChat();
      const mainMenu =
        "*Selamat Datang " +
        chat.name +
        ", di Ngubalan SmartChat*\n\n1. Informasi Alur Berkas Surat Nikah\n2. Informasi Alur Surat Keterangan Tidak Mampu\n3. Informasi Permohonan Kartu Keluarga\n4. Informasi Permohonan Akte Kelahiran\n5. Buat Surat Keterangan Tidak Mampu\n6. Live Chat\n\nPilih menu dengan cara membalas pesan ini dengan no menu yang diinginkan";

      if (msg.body === ".menu") {
        client.sendMessage(msg.from, mainMenu);
      } else if (msg.body === "1") {
        client.sendMessage(
          msg.from,
          MessageMedia.fromFilePath("./images/ALUR_SURATNIKAH.jpg")
        );
      } else if (msg.body === "2") {
        client.sendMessage(
          msg.from,
          MessageMedia.fromFilePath("./images/ALUR_SKTM.jpeg")
        );
      } else if (msg.body === "3") {
        client.sendMessage(
          msg.from,
          MessageMedia.fromFilePath("./images/ALUR_PENERBITANKK.jpg")
        );
      } else if (msg.body === "4") {
        client.sendMessage(
          msg.from,
          MessageMedia.fromFilePath("./images/ALUR_AKTE.jpg")
        );
      } else if (msg.body === "5") {
        client.sendMessage(
          msg.from,
          "Ketik, \n.```REGSKTM NAMA_LENGKAP/NIK/TTL/AGAMA/PEKERJAAN/TEMPAT_TINGGAL```\nIsi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body.includes(".REGSKTM")) {
        const skType = "SKTM";
        const userData = sktmDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else if (userData.nik.length != 16) {
            client.sendMessage(msg.from, "NIK Tidak Sesuai");
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(
            msg.from,
            "Perintah .REGSKTM: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKTM yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKIK")) {
        const skType = "SKIK";
        const dateTimeNow = dateTimeFormat();
        const userData = skikDataParser(msg.body);
        const filename = `${skType}_${userData.nama}_${dateTimeNow}`;
        const noReg = await getNextNoReg(skType);

        if (userData) {
          if (
            containsNumeric(userData.nama) &&
            containsNumeric(userData.namaOrtu)
          ) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else if (
            userData.nik.length != 16 &&
            userData.nikOrtu.length != 16
          ) {
            client.sendMessage(msg.from, "NIK Tidak Sesuai");
          } else {
            // await skikGenerate(
            //   `${filename}.docx`,
            //   skType,
            //   noReg,
            //   userData.namaOrtu,
            //   userData.ttlOrtu,
            //   userData.alamatOrtu,
            //   userData.nikOrtu,
            //   userData.nama,
            //   userData.ttl,
            //   userData.alamat,
            //   userData.nik,
            //   userData.destination
            // );
            pushToXLSX(skType, noReg, userData, `${filename}.pdf`);
            // docxToPDF(
            //   `${process.env.DATA_DIR}${skType}/docx/${filename}.docx`,
            //   `${process.env.DATA_DIR}${skType}/${filename}.pdf`
            // );
            // printDoc(`${process.env.DATA_DIR}${skType}/${filename}.pdf`);
            // client.sendMessage(
            //   msg.from,
            //   MessageMedia.fromFilePath(
            //     `${process.env.DATA_DIR}${skType}/${filename}.pdf`
            //   ),
            //   {
            //     caption: "Ini Surat Keterangannya.",
            //   }
            // );
          }
        } else {
          client.sendMessage(
            msg.from,
            "Perintah .REGSKIK: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKIK.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKIK yang benar.",
            }
          );
        }
      } else {
        const chat = await msg.getChat();
        if (!chat.isGroup) {
          client.sendMessage(msg.from, mainMenu);
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

  client.on("call", async (call) => {
    console.log("Call received, rejecting.", call);
    await call.reject();
    await client.sendMessage(
      call.from,
      "Mohon maaf, Ngubalan smartChat tidak dapat melayani anda melalui panggilan telepon"
    );
  });
}
