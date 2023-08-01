export default function skkDataParser(input) {
  const regex =
    /\.REGSKK\s(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+?)\/(.+)/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }
  const nama = match[1].trim();
  const jenisKelamin = match[2].trim();
  const alamat = match[3].trim();
  const umur = match[4].trim();
  const hariMeninggal = match[5].trim();
  const tanggalMeninggal = match[6].trim();
  const lokasiMeninggal = match[7].trim();
  const sebab = match[8].trim();

  return {
    nama,
    jenisKelamin,
    alamat,
    umur,
    hariMeninggal,
    tanggalMeninggal,
    lokasiMeninggal,
    sebab,
  };
}
