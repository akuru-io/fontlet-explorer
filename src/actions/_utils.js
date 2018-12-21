import includes from "lodash/includes";

import Database from "../libs/database/sync";
import { get } from "../libs/request";
import { API_BASE_URL, localStorePath } from "../config";

const os = window.require("os");
const sudo = window.require("sudo-prompt");

export const getLocalCacheInstance = () => new Database(localStorePath);

export const fetchResourceJSON = () => get(`${API_BASE_URL}/fonts`);

export const getPlatformInfo = () => {
  const platformTypeMap = {
    Windows_NT: "win",
    Darwin: "darwin",
    Linux: "linux"
  };
  const platformType = os.type();
  const type = includes(Object.keys(platformTypeMap), platformType)
    ? platformType
    : "linux";
  return { type: platformTypeMap[type] };
};

export const runCmd = cmd =>
  new Promise((resolve, reject) => {
    const options = {
      name: "Fontlet",
      cachePassword: true
    };
    sudo.exec(cmd, options, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });

// Url remove last part of.
export const removeLastDirPartOf = url => {
  const urlArr = url.split("\\");
  urlArr.pop();
  return urlArr.join("\\");
};
