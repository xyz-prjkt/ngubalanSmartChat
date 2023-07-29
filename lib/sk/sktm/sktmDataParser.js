export default function sktmDataParser(input) {
  const regex =
    /\.REGSKTM\s+(.+?)\/([\w\s,]+)\/([\w\s,-]+)\/([\w\s,]+)\/([\w\s,]+)\/([\w\s,]+)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  return {
    nama: match[1].trim(),
    nik: match[2].trim(),
    ttl: match[3].trim(),
    agama: match[4].trim(),
    bekerja: match[5].trim(),
    alamat: match[6].trim(),
  };
}
