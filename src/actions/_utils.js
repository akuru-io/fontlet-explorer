import includes from "lodash/includes";

import Database from "../libs/database/async";
import { resourceDirPath, FL_RESOURCE_URL } from "../config";
import { get } from "../libs/request";

const os = window.require("os");

export const getLocalCacheInstance = () =>
  new Database(`${resourceDirPath}\\localCache`);

export const fetchResourceJSON = () => get(FL_RESOURCE_URL);

export const getPlatformInfo = () => {
  const osTypeMap = { Windows_NT: "Win", Darwin: "Darwin", Linux: "Linux" };
  const osType = os.type();
  const type = includes(Object.keys(osTypeMap), osType) ? osType : "Linux";
  return { type: osTypeMap[type] };
};

// Url remove last part of.
export const removeLastDirPartOf = url => {
  const urlArr = url.split("\\");
  urlArr.pop();
  return urlArr.join("\\");
};
