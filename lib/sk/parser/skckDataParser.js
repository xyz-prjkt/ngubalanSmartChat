export default function skckDataParser(input) {
  const regex =
    /\.REGSKCK\s(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+)\/(.+)\/(.+)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  return {
    nama: match[1].trim(),
    nik: match[2].trim(),
    ttl: match[3].trim(),
    agama: match[4].trim(),
    kelamin: match[5].trim(),
    alamat: match[6].trim(),
    status: match[7].trim(),
    pendidikan: match[8].trim(),
    pekerjaan: match[9].trim(),
    keperluan: match[10].trim(),
  };
}
