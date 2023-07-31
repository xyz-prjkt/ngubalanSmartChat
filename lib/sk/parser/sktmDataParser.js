export default function sktmDataParser(input) {
  const regex =
    /\.REGSKTM\s+(.+?)\/([\w\s,]+)\/([\w\s,]+)\/([\w\s,]+)\/([\w\s,-]+)\/([\w\s,]+)\/([\w\s,]+)\/([\w\s,]+)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  return {
    nama: match[1].trim(),
    nik: match[2].trim(),
    namaKepala: match[3].trim(),
    noKK: match[4].trim(),
    ttl: match[5].trim(),
    agama: match[6].trim(),
    bekerja: match[7].trim(),
    alamat: match[8].trim(),
  };
}
