import { MessageMedia } from "../../mainClient.js";
import { containsNumeric, dateTimeFormat } from "../utils/commonUtils.js";

import sktmDataParser from "../sk/parser/sktmDataParser.js";
import skikDataParser from "../sk/parser/skikDataParser.js";
import { sendData } from "./clientAPI.js";
import skmsDataParser from "../sk/parser/skmsDataParser.js";
import skdiDataParser from "../sk/parser/skdiDataParser.js";
import skdDataParser from "../sk/parser/skdDataParser.js";
import skuDataParser from "../sk/parser/skuDataParser.js";
import skkDataParser from "../sk/parser/skkDataParser.js";
import skpbDataParser from "../sk/parser/skpbDataParser.js";
import skhilDataParser from "../sk/parser/skhilDataParser.js";
import skckDataParser from "../sk/parser/skckDataParser.js";

export default function clientHandler(client) {
  client.on("message", async (msg) => {
    try {
      let chat = await msg.getChat();
      const mainMenu =
        "*Selamat Datang " +
        chat.name +
        ", di Ngubalan SmartChat*\n\n1. Buat Surat Keterangan Tidak Mampu\n" +
        "2. Buat Surat Keterangan Izin Keluarga\n" +
        "3. Buat Surat Keterangan Membeli BBM\n" +
        "4. Buat Surat Keterangan Domisili Instansi\n" +
        "5. Buat Surat Keterangan Domisili\n" +
        "6. Buat Surat Keterangan Usaha\n" +
        "7. Buat Surat Keterangan Kematian\n" +
        "8. Buat Surat Keterangan Pengajuan Bank\n" +
        "9. Buat Surat Keterangan Kehilangan\n" +
        "\nPilih menu dengan cara membalas pesan ini dengan no menu yang diinginkan";

      if (msg.body === ".menu") {
        client.sendMessage(msg.from, mainMenu);
      } else if (msg.body === "1") {
        client.sendMessage(
          msg.from,
          "Ketik, \n```.REGSKTM NAMA LENGKAP/NIK/TTL/AGAMA/PEKERJAAN/TEMPAT_TINGGAL```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "2") {
        client.sendMessage(
          msg.from,
          "Ketik, \n```.REGSKIK NAMA ORANG TUA/TEMPAT TANGGAL LAHIR ORANG TUA/ALAMAT ORANG TUA/NIK ORANG TUA/NAMA LENGKAP/TEMPAT TANGGAL LAHIR/ALAMAT/NIK/TUJUAN```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "3") {
        client.sendMessage(
          msg.from,
          "Ketik, \n```.REGSKMS NAMA LENGKAP/TEMPAT TANGGAL LAHIR/NIK/ALAMAT/USAHA/JENIS ALAT/JUMLAH ALAT/FUNGSI ALAT/JENIS BBM/LOKASI SPBU```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "4") {
        client.sendMessage(
          msg.from,
          "Ketik, \n``` .REGSKDI NAMA LENGKAP/ALAMAT ```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "5") {
        client.sendMessage(
          msg.from,
          "Ketik, \n```.REGSKD NAMA LENGKAP/NIK/TEMPAT TANGGAL LAHIR/AGAMA/JENIS KELAMIN/STATUS NIKAH/PEKERJAAN/ALAMAT ```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "6") {
        client.sendMessage(
          msg.from,
          "Ketik, \n``` .REGSKU NAMA LENGKAP/NIK/TEMPAT TANGGAL LAHIR/JENIS KELAMIN/ALAMAT/AGAMA/STATUS/PENDIDIKAN/PEKERJAAN/USAHA```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "7") {
        client.sendMessage(
          msg.from,
          "Ketik, \n``` .REGSKK NAMA LENGKAP/JENIS KELAMIN/ALAMAT/UMUR/HARI MENINGGAL/TANGGAL MENINGGAL/LOKASI MENINGGAL/SEBAB ```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "8") {
        client.sendMessage(
          msg.from,
          "Ketik, \n``` .REGSKPB NAMA LENGKAP/NIK/TEMPAT TANGGAL LAHIR/JENIS KELAMIN/ALAMAT/AGAMA/STATUS MENIKAH/PENDIDIKAN/PEKERJAAN/USAHA/BANK ```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
        );
      } else if (msg.body === "9") {
        client.sendMessage(
          msg.from,
          "Ketik, \n``` .REGSKHIL NAMA LENGKAP/NIK/TEMPAT TANGGAL LAHIR/JENIS KELAMIN/ALAMAT/AGAMA/STATUS MENIKAH/PENDIDIKAN/PEKERJAAN/YANG HILANG/KETERANGAN ```\n" +
            "Isi data sesuai format tersebut, lalu kirim pesan tersebut di nomor ini"
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
        const userData = skikDataParser(msg.body);
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
            "Perintah .REGSKIK: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKIK yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKMS")) {
        const skType = "SKMS";
        const userData = skmsDataParser(msg.body);
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
            "Perintah .REGSKMS: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKIK yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKDI")) {
        const skType = "SKDI";
        const userData = skdiDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(
              msg.from,
              "Nama Instansi tidak boleh mengandung numerik"
            );
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(
            msg.from,
            "Perintah .REGSKDI: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKDI yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKD")) {
        const skType = "SKD";
        const userData = skdDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(
              msg.from,
              "Nama Instansi tidak boleh mengandung numerik"
            );
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(msg.from, "Perintah .REGSKD: Tidak Sesuai Format");
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKD yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKU")) {
        const skType = "SKU";
        const userData = skuDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(msg.from, "Perintah .REGSKU: Tidak Sesuai Format");
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKU yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKK")) {
        const skType = "SKK";
        const userData = skkDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(msg.from, "Perintah .REGSKK: Tidak Sesuai Format");
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKK yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKPB")) {
        const skType = "SKPB";
        const userData = skpbDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(
            msg.from,
            "Perintah .REGSKPB: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKPB yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKHIL")) {
        const skType = "SKHIL";
        const userData = skhilDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(
            msg.from,
            "Perintah .REGSKHIL: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            MessageMedia.fromFilePath("./images/EXAMPLE_REGSKTM.png"),
            {
              caption:
                "Berikut ini contoh penulisan format .REGSKHIL yang benar.",
            }
          );
        }
      } else if (msg.body.includes(".REGSKCK")) {
        const skType = "SKCK";
        const userData = skckDataParser(msg.body);
        const dateTimeNow = dateTimeFormat();
        if (userData) {
          if (containsNumeric(userData.nama)) {
            client.sendMessage(msg.from, "Nama tidak boleh mengandung numerik");
          } else {
            sendData([skType, dateTimeNow, msg.from, userData]);
          }
        } else {
          client.sendMessage(
            msg.from,
            "Perintah .REGSKCK: Tidak Sesuai Format"
          );
          client.sendMessage(
            msg.from,
            "Berikut ini contoh penulisan format .REGSKCK yang benar."
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
