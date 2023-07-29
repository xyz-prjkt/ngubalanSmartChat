document.addEventListener("click", async function (event) {
  if (event.target && event.target.classList.contains("btnPrint")) {
    const skType = event.target.dataset.sktype;
    const nama = event.target.dataset.nama;
    const nik = event.target.dataset.nik;
    const ttl = event.target.dataset.ttl;
    const agama = event.target.dataset.agama;
    const bekerja = event.target.dataset.bekerja;
    const alamat = event.target.dataset.alamat;
    const datetime = event.target.dataset.datetime;

    const response = await fetch("/genDoc", {
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
  } else if (event.target && event.target.classList.contains("btnReject")) {
    const dataId = event.target.dataset.id;
    if (!dataId || isNaN(dataId)) {
      return;
    }

    const response = await fetch(`/deleteData/${dataId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.reload();
    }
  } else if (event.target && event.target.classList.contains("btnDone")) {
    const dataId = event.target.dataset.id;
    const notelp = event.target.dataset.notelp;
    const msg = "Surat sudah siap diambil di Balai Desa";

    const response = fetch("/sendMsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notelp,
        msg,
      }),
    });

    const deleteResponse = fetch(`/deleteData/${dataId}`, {
      method: "DELETE",
    });
    window.location.reload();
  }
});
