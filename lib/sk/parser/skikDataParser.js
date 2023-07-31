export default function skikDataParser(input) {
  const regex =
    /\.REGSKIK\s(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  const namaOrtu = match[1].trim();
  const ttlOrtu = match[2].trim();
  const alamatOrtu = match[3].trim();
  const nikOrtu = match[4].trim();

  const nama = match[5].trim();
  const ttl = match[6].trim();
  const alamat = match[7].trim();
  const nik = match[8].trim();

  const destination = match[9].trim();

  return {
    namaOrtu,
    ttlOrtu,
    alamatOrtu,
    nikOrtu,
    nama,
    ttl,
    alamat,
    nik,
    destination,
  };
}
