import each from "lodash/each";
import find from "lodash/find";
import { getLocalCacheInstance, fetchResourceJSON } from "./_utils";

const init = async (cb = () => {}) => {
  try {
    const localCache = getLocalCacheInstance();

    // Check for existing user in localCache
    const resourceJson = await fetchResourceJSON();
    const user = await localCache.findOne({ type: "INIT" });
    const userModifed = { ...user, lastSeen: new Date() };
    let installedFonts = null;

    // If the user already registered;
    if (user) {
      // Update lastSeen
      localCache.update({ type: "INIT" }, userModifed);
      // Fetch Installed fonts
      installedFonts = await localCache.find({ type: "INSTALLED" });
    }

    const flags = {};
    each(resourceJson.fonts, ({ id }) => {
      flags[id] = null;
    });

    // set isUpdateAvailable flag
    const fonts = resourceJson.fonts.map(font => {
      const fontInstalled = find(installedFonts || [], f => f.id === font.id);
      if (!fontInstalled) return { ...font, isUpdateAvailable: false };
      return {
        ...font,
        isUpdateAvailable: font.version !== fontInstalled.version
      };
    });

    cb(null, {
      ...resourceJson,
      fonts,
      user,
      installedFonts: installedFonts || [],
      flags,
      isUserRegistered: !!user
    });
  } catch (error) {
    cb({ message: "Initializing failed.", params: error }, null);
  }
};

export default init;
