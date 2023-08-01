export default function skdDataParser(input) {
  const regex =
    /\.REGSKD\s(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+)/;

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
    status: match[6].trim(),
    pekerjaan: match[7].trim(),
    alamat: match[8].trim(),
  };
}
