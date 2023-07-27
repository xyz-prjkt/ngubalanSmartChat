import os from "os";

function isWindows64() {
  return os.platform() === 'win32' && os.arch() === 'x64';
}

function isWindows() {
  if (os.platform() === "win32") {
    return true;
  } else {
    return false;
  }
}

function unixToWinCommand(cmd) {
    let replacedSlashes = cmd.replace(/\//g, '\\');
    let replacedQuotes = replacedSlashes.replace(/'/g, '"');
    return replacedQuotes;
}

export { isWindows64, isWindows, unixToWinCommand };