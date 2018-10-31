import install from "./installer";
import uninstall from "./uninstaller";
import update from "./updater";

import { getPlatformInfo } from "../_utils";

const platform = getPlatformInfo();

export const installFont = async font => {
  const platformType = platform.type;
  return new Promise((resolve, reject) => {
    install[platformType](font, (error, resp) => {
      if (error) reject(error);
      resolve(resp);
    });
  });
};

export const uninstallFont = async font => {
  const platformType = platform.type;
  return new Promise((resolve, reject) => {
    uninstall[platformType](font, (error, resp) => {
      if (error) reject(error);
      resolve(resp);
    });
  });
};

export const updateFont = async font => {
  const platformType = platform.type;
  return new Promise((resolve, reject) => {
    update[platformType](font, (error, resp) => {
      if (error) reject(error);
      resolve(resp);
    });
  });
};
