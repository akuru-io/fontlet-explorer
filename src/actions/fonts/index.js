import { getPlatformInfo, getLocalCacheInstance } from "../_utils";
import install from "./installer";
import uninstall from "./uninstaller";
import update from "./updater";

const platform = getPlatformInfo();

export const installFont = (font, cb) => {
  const platformType = platform.type;
  install[platformType](font, cb);
};

export const uninstallFont = (font, cb) => {
  const platformType = platform.type;
  uninstall[platformType](font, cb);
};

export const updateFont = (font, cb) => {
  const platformType = platform.type;
  update[platformType](font, cb);
};

export const addInstalledFontToLocalCache = async (font, cb = () => {}) => {
  try {
    const localCache = getLocalCacheInstance();
    await localCache.insert({
      type: "INSTALLED",
      id: font.id,
      familyName: font.familyName,
      version: font.version
    });
    cb(null, font);
  } catch (error) {
    cb({ message: "Failed to update localCache!", params: error }, null);
  }
};

export const removeUninstalledFontFromLocalCache = async (
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

export const updateInstalledFontToLocalCache = async (font, cb = () => {}) => {
  try {
    const localCache = getLocalCacheInstance();
    await localCache.update(
      { type: "INSTALLED", id: font.id },
      {
        type: "INSTALLED",
        id: font.id,
        familyName: font.familyName,
        version: font.version
      }
    );
    cb(null, font);
  } catch (error) {
    cb({ message: "Failed to update localCache!", params: error }, null);
  }
};
