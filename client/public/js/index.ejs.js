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
        const namaKepala = event.target.dataset.namakepala;
        const noKK = event.target.dataset.nokk;
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
            namaKepala,
            noKK,
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

        const response = await fetch(`/deleteData/${dataId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          window.location.reload();
        }

        fetch("/sendMsg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notelp,
            msg,
          }),
        });
      }
    }
  } else if (event.target && event.target.classList.contains("btnDone")) {
    const dataId = event.target.dataset.id;
    const notelp = event.target.dataset.notelp;
    const msg = "Surat sudah siap diambil di Balai Desa";

    fetch("/sendMsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notelp,
        msg,
      }),
    });

    fetch(`/deleteData/${dataId}`, {
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
