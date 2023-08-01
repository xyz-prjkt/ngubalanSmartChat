export default function skhilDataParser(input) {
  const regex =
    /\.REGSKHIL\s(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  const nama = match[1].trim();
  const nik = match[2].trim();
  const ttl = match[3].trim();
  const kelamin = match[4].trim();
  const alamat = match[5].trim();
  const agama = match[6].trim();
  const status = match[7].trim();
  const pendidikan = match[8].trim();
  const pekerjaan = match[9].trim();
  const hilang = match[10].trim();
  const keterangan = match[11].trim();

  return {
    nama,
    nik,
    ttl,
    kelamin,
    alamat,
    agama,
    status,
    pendidikan,
    pekerjaan,
    hilang,
    keterangan,
  };
}
