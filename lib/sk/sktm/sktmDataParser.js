export default function sktmDataParser(input) {
  const regex =
    /\.REGSKTM\s+(.+?)\/([\w\s,]+)\/([\w\s,-]+)\/([\w\s,]+)\/([\w\s,]+)\/([\w\s,]+)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  const nama = match[1].trim();
  const nik = match[2].trim();
  const ttl = match[3].trim();
  const agama = match[4].trim();
  const bekerja = match[5].trim();
  const alamat = match[6].trim();

  return {
    nama,
    nik,
    ttl,
    agama,
    bekerja,
    alamat,
  };
}
