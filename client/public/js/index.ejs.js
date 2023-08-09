document.getElementById("defaultOpen").click();

document.addEventListener("click", async function (event) {
  if (event.target && event.target.classList.contains("btnPrint")) {
    if (confirm(`Yakin untuk acc data ini? `)) {
      const skType = event.target.dataset.sktype;
      const datetime = event.target.dataset.datetime;
      let response;
      if (skType === "SKTM") {
        const nama = event.target.dataset.nama;
        const nik = event.target.dataset.nik;
        const ttl = event.target.dataset.ttl;
        const agama = event.target.dataset.agama;
        const bekerja = event.target.dataset.bekerja;
        const alamat = event.target.dataset.alamat;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            nik,
            ttl,
            agama,
            bekerja,
            alamat,
            datetime,
          }),
        });
      } else if (skType === "SKIK") {
        const namaOrtu = event.target.dataset.namaortu;
        const ttlOrtu = event.target.dataset.ttlortu;
        const alamatOrtu = event.target.dataset.alamatortu;
        const nikOrtu = event.target.dataset.nikortu;
        const nama = event.target.dataset.nama;
        const ttl = event.target.dataset.ttl;
        const alamat = event.target.dataset.alamat;
        const nik = event.target.dataset.nik;
        const destination = event.target.dataset.destination;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            namaOrtu,
            ttlOrtu,
            alamatOrtu,
            nikOrtu,
            nama,
            ttl,
            alamat,
            nik,
            destination,
            datetime,
          }),
        });
      } else if (skType === "SKMS") {
        const nama = event.target.dataset.nama;
        const ttl = event.target.dataset.ttl;
        const nik = event.target.dataset.nik;
        const alamat = event.target.dataset.alamat;
        const usaha = event.target.dataset.usaha;
        const jenisAlat = event.target.dataset.jenisalat;
        const jumlahAlat = event.target.dataset.jumlahalat;
        const fungsiAlat = event.target.dataset.fungsialat;
        const jenisBBM = event.target.dataset.jenisbbm;
        const lokasiSPBU = event.target.dataset.lokasispbu;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            ttl,
            nik,
            alamat,
            usaha,
            jenisAlat,
            jumlahAlat,
            fungsiAlat,
            jenisBBM,
            lokasiSPBU,
            datetime,
          }),
        });
      } else if (skType === "SKDI") {
        const nama = event.target.dataset.nama;
        const alamat = event.target.dataset.alamat;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            alamat,
            datetime,
          }),
        });
      } else if (skType === "SKD") {
        const nama = event.target.dataset.nama;
        const nik = event.target.dataset.nik;
        const ttl = event.target.dataset.ttl;
        const agama = event.target.dataset.agama;
        const kelamin = event.target.dataset.kelamin;
        const status = event.target.dataset.status;
        const pekerjaan = event.target.dataset.pekerjaan;
        const alamat = event.target.dataset.alamat;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            nik,
            ttl,
            agama,
            kelamin,
            status,
            pekerjaan,
            alamat,
            datetime,
          }),
        });
      } else if (skType === "SKU") {
        const nama = event.target.dataset.nama;
        const nik = event.target.dataset.nik;
        const ttl = event.target.dataset.ttl;
        const kelamin = event.target.dataset.kelamin;
        const alamat = event.target.dataset.alamat;
        const agama = event.target.dataset.agama;
        const status = event.target.dataset.status;
        const pendidikan = event.target.dataset.pendidikan;
        const pekerjaan = event.target.dataset.pekerjaan;
        const usaha = event.target.dataset.usaha;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            nik,
            ttl,
            kelamin,
            alamat,
            agama,
            status,
            pendidikan,
            pekerjaan,
            usaha,
            datetime,
          }),
        });
      } else if (skType === "SKK") {
        const nama = event.target.dataset.nama;
        const jenisKelamin = event.target.dataset.jeniskelamin;
        const alamat = event.target.dataset.alamat;
        const umur = event.target.dataset.umur;
        const hariMeninggal = event.target.dataset.harimeninggal;
        const tanggalMeninggal = event.target.dataset.tanggalmeninggal;
        const lokasiMeninggal = event.target.dataset.lokasimeninggal;
        const sebab = event.target.dataset.sebab;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            jenisKelamin,
            alamat,
            umur,
            hariMeninggal,
            tanggalMeninggal,
            lokasiMeninggal,
            sebab,
            datetime,
          }),
        });
      } else if (skType === "SKPB") {
        const nama = event.target.dataset.nama;
        const nik = event.target.dataset.nik;
        const ttl = event.target.dataset.ttl;
        const kelamin = event.target.dataset.kelamin;
        const alamat = event.target.dataset.alamat;
        const agama = event.target.dataset.agama;
        const status = event.target.dataset.status;
        const pendidikan = event.target.dataset.pendidikan;
        const pekerjaan = event.target.dataset.pekerjaan;
        const usaha = event.target.dataset.usaha;
        const bank = event.target.dataset.bank;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            nik,
            ttl,
            kelamin,
            alamat,
            agama,
            status,
            pendidikan,
            pekerjaan,
            usaha,
            bank,
            datetime,
          }),
        });
      } else if (skType === "SKHIL") {
        const nama = event.target.dataset.nama;
        const nik = event.target.dataset.nik;
        const ttl = event.target.dataset.ttl;
        const kelamin = event.target.dataset.kelamin;
        const alamat = event.target.dataset.alamat;
        const agama = event.target.dataset.agama;
        const status = event.target.dataset.status;
        const pendidikan = event.target.dataset.pendidikan;
        const pekerjaan = event.target.dataset.pekerjaan;
        const hilang = event.target.dataset.hilang;
        const keterangan = event.target.dataset.keterangan;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            nik,
            ttl,
            kelamin,
            alamat,
            agama,
            status,
            pendidikan,
            pekerjaan,
            hilang,
            keterangan,
            datetime,
          }),
        });
      } else if (skType === "SKCK") {
        const nama = event.target.dataset.nama;
        const nik = event.target.dataset.nik;
        const ttl = event.target.dataset.ttl;
        const agama = event.target.dataset.agama;
        const kelamin = event.target.dataset.kelamin;
        const alamat = event.target.dataset.alamat;
        const status = event.target.dataset.status;
        const pendidikan = event.target.dataset.pendidikan;
        const pekerjaan = event.target.dataset.pekerjaan;
        const keperluan = event.target.dataset.keperluan;

        response = await fetch("/genDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skType,
            nama,
            nik,
            ttl,
            agama,
            kelamin,
            alamat,
            status,
            pendidikan,
            pekerjaan,
            keperluan,
            datetime,
          }),
        });
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        URL.revokeObjectURL(url);
      }
    }
  } else if (event.target && event.target.classList.contains("btnReject")) {
    const adminReason = window.prompt(`Alasan permintaan surat ditolak? `);
    const dataId = event.target.dataset.id;
    const notelp = event.target.dataset.notelp;
    if (adminReason !== null) {
      if (
        confirm(`Yakin untuk menolak permintaan surat? Alasan: ${adminReason}`)
      ) {
        const msg = `Perminataan Surat Anda ditolak, ${adminReason}`;
        if (!dataId || isNaN(dataId)) {
          return;
        }

        await fetch(`/deleteData/${dataId}`, {
          method: "DELETE",
        });

        await fetch("/sendMsg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notelp,
            msg,
          }),
        });
        window.location.reload();
      }
    }
  } else if (event.target && event.target.classList.contains("btnDone")) {
    const dataId = event.target.dataset.id;
    const notelp = event.target.dataset.notelp;
    const msg = "Surat sudah siap diambil di Balai Desa";

    console.log(notelp);

    await fetch("/sendMsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notelp,
        msg,
      }),
    });

    await fetch(`/deleteData/${dataId}`, {
      method: "DELETE",
    });
    window.location.reload();
  }
});

function openSK(evt, skType) {
  var i, tableContent, navlinks;

  tableContent = document.getElementsByClassName("table-content");
  for (i = 0; i < tableContent.length; i++) {
    tableContent[i].style.display = "none";
  }

  navlinks = document.getElementsByClassName("nav-link");
  for (i = 0; i < navlinks.length; i++) {
    navlinks[i].className = navlinks[i].className.replace(" active", "");
  }

  document.getElementById(skType).style.display = "block";
  evt.currentTarget.className += " active";
}
