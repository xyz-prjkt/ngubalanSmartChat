document.addEventListener("click", async function (event) {
  if (event.target && event.target.classList.contains("btnPrint")) {
    if (confirm(`Yakin untuk acc data ini? `)) {
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
