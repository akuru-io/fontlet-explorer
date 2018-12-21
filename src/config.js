const { remote } = window.require("electron");
const path = window.require("path");
const os = window.require("os");

const { app } = remote;

// Remote URLs
// eslint-disable-next-line
export const API_BASE_URL = "http://fontlet.org/api";
export const WT_API_BASE_URL =
  "https://wt-a14a4787565a4dc11131e5ec3b0a534a-0.sandbox.auth0-extend.com/fontcase-user-api";

// localStore name
export const localStoreName = "localCache";

// Local app paths
export const appRoot = app.getAppPath();
export const appUserDir = app.getPath("userData");
export const resourceDir = path.join(appRoot, "resources");
export const localStorePath = path.join(appRoot, "resources", localStoreName);

// System Fonts Dir.
const getWindowsFontDir = () => {
  const platformType = os.type();
  if (platformType !== "Windows_NT") return null;

  const homeDir = os.homedir();
  const driveLetter = homeDir.split(":")[0];
  return path.join(`${driveLetter}:\\`, "Windows", "Fonts");
};

export const localFontsDirPaths = {
  darwin: "~/Library/Fonts/",
  linux: "~/.fonts",
  win: getWindowsFontDir()
};

// FontReg Exec path
const ARCH_MAP = { x64: "bin.x86-64", x86: "bin.x86-32" };
const osArch = os.arch();
export const fontRegExecPath = path.join(
  appRoot,
  "resources",
  "fontreg",
  ARCH_MAP[osArch]
);
