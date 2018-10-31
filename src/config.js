/* eslint max-len: 0 */
import { getRandomInt } from "./libs/mixins";

const { remote } = window.require("electron");
const { app } = remote;

// Remote URLs
export const API_BASE_URL =
  "https://wt-a14a4787565a4dc11131e5ec3b0a534a-0.sandbox.auth0-extend.com/fontcase-user-api/";

const cacheBusterID = getRandomInt(0, 1000);
export const FL_RESOURCE_URL = `https://raw.githubusercontent.com/fontlet/assets/master/fontlet.json?cacheBusterID=${cacheBusterID}`;

// Local app paths
export const appRoot = app.getAppPath();
export const appUserDir = app.getPath("userData");
export const resourceDirPath = `${appUserDir}\\resources`;

export const localFontsDirPaths = {
  darwin: "~/Library/Fonts/",
  linux: "~/.fonts"
};

export default {
  API_BASE_URL,
  FL_RESOURCE_URL,
  appRoot,
  appUserDir
};
