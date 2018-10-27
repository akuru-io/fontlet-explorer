import Database from "../utils/database/async";
import { resourceDirPath, FL_RESOURCE_URL } from "../config";
import { get } from "../utils/request";

export const getLocalCacheInstance = () =>
  new Database(`${resourceDirPath}\\localCache7`);

export const fetchResourceJSON = () => get(FL_RESOURCE_URL);
