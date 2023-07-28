import { MessageMedia } from "../../mainClient.js";
import {
  containsNumeric,
  dateTimeFormat,
  tglSuratFormat,
} from "../utils/commonUtils.js";
import parseData from "../utils/dataUtils.js";
import { createSK } from "../utils/docsUtils.js";
import pushToXLSX, { getNextNoReg } from "../utils/excelUtils.js";

export default function clientHandler(client) {
  client.on("message", async (msg) => {
    try {
      let chat = await msg.getChat();
      const mainMenu =
        "*Selamat Datang " +
        chat.name +
        ", di Ngubalan SmartChat*\n\n1. Informasi Alur Berkas Surat Nikah\n2. Informasi Alur Surat Keterangan Tidak Mampu\n3. Informasi Permohonan Kartu Keluarga\n4. Informasi Permohonan Akte Kelahiran\n5. Buat Surat Keterangan Tidak Mampu\n6. Live Chat\n\nPilih menu dengan cara membalas pesan ini dengan no menu yang diinginkan";

      if ((process.env.TYPE = "debug")) {
        console.log("Pesan Masuk: ", msg);
      }

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
          "Ketik, \n.```REGSK NAMA_LENGKAP/NIK/TTL/AGAMA/PEKERJAAN/TEMPAT_TINGGAL```\nIsi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body.includes(".REGSK")) {
        const skType = "SKTM";
        const dateTimeNow = dateTimeFormat();
        const userData = parseData(msg.body);
        const filename = `${skType}_${userData.nama}_${dateTimeNow}.pdf`;
        const noReg = await getNextNoReg(skType);

        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else if (userData.nik.length != 16) {
            client.sendMessage(msg.from, "NIK Tidak Sesuai");
          } else {
            await createSK(
              filename,
              skType,
              noReg,
              userData.nama,
              userData.nik,
              userData.ttl,
              userData.agama,
              userData.bekerja,
              userData.alamat,
              tglSuratFormat()
            );
            pushToXLSX(skType, noReg, userData, filename);
            client.sendMessage(
              msg.from,
              MessageMedia.fromFilePath(
                `${process.env.DATA_DIR}${skType}/${skType}_${userData.nama}_${dateTimeNow}.pdf`
              ),
              {
                caption: "Ini Surat Keterangannya.",
              }
            );
          }
        } else {
          client.sendMessage(msg.from, "Perintah .REGSK: Tidak Sesuai Format");
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSK.png"),
            {
              caption: "Berikut ini contoh penulisan format .REGSK yang benar.",
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
      client.sendMessage(
        msg.from,
        "An error occurred while processing your request. Please try again later."
      );
      if ((process.env.TYPE = "debug")) {
        client.sendMessage(msg.from, "Error: " + error);
      }
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
