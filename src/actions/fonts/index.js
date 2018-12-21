import { getPlatformInfo, getLocalCacheInstance } from "../_utils";
import install from "./installer";
import uninstall from "./uninstaller";
import update from "./updater";

const localCache = getLocalCacheInstance();

const platform = getPlatformInfo();
const platformType = platform.type;

// localCache CRUD
export const addInstalledFontToLocalCache = async font => {
  try {
    return await localCache.insert({
      type: "INSTALLED",
      id: font.id,
      familyName: font.familyName,
      version: font.version
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const removeUninstalledFontFromLocalCache = async font => {
  try {
    return await localCache.remove({ type: "INSTALLED", id: font.id });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateInstalledFontToLocalCache = async font => {
  try {
    return await localCache.update(
      { type: "INSTALLED", id: font.id },
      {
        type: "INSTALLED",
        id: font.id,
        familyName: font.familyName,
        version: font.version
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

// Main actions.
export const installFont = async font => {
  try {
    await install[platformType](font);
    const installedFont = await addInstalledFontToLocalCache(font);
    return installedFont;
  } catch (error) {
    throw new Error(error);
  }
};

export const uninstallFont = async font => {
  try {
    await uninstall[platformType](font);
    await removeUninstalledFontFromLocalCache(font);
    return font;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateFont = async font => {
  try {
    await update[platformType](font);
    await updateInstalledFontToLocalCache(font);
    return font;
  } catch (error) {
    throw new Error(error);
  }
};
