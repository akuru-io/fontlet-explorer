import { getLocalCacheInstance } from "../_utils";

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
