import includes from "lodash/includes";

import Database from "../libs/database/async";
import { resourceDirPath, FL_RESOURCE_URL } from "../config";
import { get } from "../libs/request";

const os = window.require("os");

export const getLocalCacheInstance = () =>
  new Database(`${resourceDirPath}\\localCache11`);

export const fetchResourceJSON = () => get(FL_RESOURCE_URL);

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

// Url remove last part of.
export const removeLastDirPartOf = url => {
  const urlArr = url.split("\\");
  urlArr.pop();
  return urlArr.join("\\");
};
