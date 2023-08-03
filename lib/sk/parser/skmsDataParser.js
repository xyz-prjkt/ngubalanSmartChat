export default function skmsDataParser(input) {
  const regex =
    /\.REGSKMS\s(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  return {
    nama: match[1].trim(),
    ttl: match[2].trim(),
    nik: match[3].trim(),
    alamat: match[4].trim(),
    usaha: match[5].trim(),
    jenisAlat: match[6].trim(),
    jumlahAlat: match[7].trim(),
    fungsiAlat: match[8].trim(),
    jenisBBM: match[9].trim(),
    lokasiSPBU: match[10].trim(),
  };
}

console.log(
  skmsDataParser(
    ".REGSKMS BISRI MUSTHOFA/Tulungagung, 22 Maret 1997/3504142202900003/Rt. 03 Rw. 02 Dsn. Ngluweng Ds. Ngubalan Kec. Kalidawir Kab. Tulungagung/Pertanian/Hand Traktor/2/Membajak Sawah/Solar/Selorejo"
  )
);
