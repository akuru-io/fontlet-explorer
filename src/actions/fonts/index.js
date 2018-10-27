import { getPlatformInfo, getLocalCacheInstance } from "../_utils";
import install from "./installer";
import uninstall from "./uninstaller";

const os = getPlatformInfo();

export const installFont = (font, cb) => {
  const osType = os.type;
  install[osType](font, cb);
};

export const uninstallFont = (font, cb) => {
  const osType = os.type;
  uninstall[osType](font, cb);
};

export const addInstalledFontToLocalCache = async (font, cb = () => {}) => {
  try {
    const localCache = getLocalCacheInstance();
    await localCache.insert({ type: "INSTALLED", id: font.id });
    cb(null, font);
  } catch (error) {
    cb({ message: "Failed to update localCache!", params: error }, null);
  }
};

export const removeInstalledFontFromLocalCache = async (
  font,
  cb = () => {}
) => {
  try {
    const localCache = getLocalCacheInstance();
    await localCache.remove({ type: "INSTALLED", id: font.id });
    cb(null, font);
  } catch (error) {
    cb({ message: "Failed to update localCache!", params: error }, null);
  }
};
