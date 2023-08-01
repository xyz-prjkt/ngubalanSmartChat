export default function skdiDataParser(input) {
  const regex = /\.REGSKDI\s+([^/]+)\/([^\n]+)$/;

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  return {
    nama: match[1].trim(),
    alamat: match[2].trim(),
  };
}
