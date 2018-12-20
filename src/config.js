/* eslint max-len: 0 */
const path = window.require("path");
const os = window.require("os");
const { remote } = window.require("electron");
const { app } = remote;

// Remote URLs
export const API_BASE_URL =
  "https://wt-a14a4787565a4dc11131e5ec3b0a534a-0.sandbox.auth0-extend.com/fontcase-user-api/";
export const FL_RESOURCE_URL = "http://fontlet.org/api/fonts";

// localStore name
export const localStoreName = "localCache";

// Local app paths
export const appRoot = app.getAppPath();
export const appUserDir = app.getPath("userData");
export const resourceDirPath = path.join(appRoot, "recources");
export const localStorePath = path.join(appRoot, "recources", localStoreName);

const getWindowsFontDir = () => {
  const platformType = os.type();
  if (platformType !== "Windows_NT") return null;

  const homeDir = os.homedir();
  const driveLetter = homeDir.split(":")[0];
  return path.join(`${driveLetter}:\\`, "Windows", "Fonts");
}

export const localFontsDirPaths = {
  darwin: "~/Library/Fonts/",
  linux: "~/.fonts",
  win: getWindowsFontDir()
};

// FontReg Exec path
const ARCH_MAP = {x64: "bin.x86-64", x86: "bin.x86-32"};
const osArch = os.arch();
export const fontRegExecPath = path.join(appRoot, "recources", "fontreg", ARCH_MAP[osArch]);

export default {
  API_BASE_URL,
  FL_RESOURCE_URL,
  appRoot,
  appUserDir,
  localStoreName,
  localStorePath,
  fontRegExecPath
};
