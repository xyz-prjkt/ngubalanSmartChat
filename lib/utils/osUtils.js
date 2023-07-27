import os from "os";

export default function isWindows() {
  if (os.platform() === "win32") {
    return true;
  } else {
    return false;
  }
}
