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

    const fonts = [];
    const flags = {};
    each(resourceJson.fonts, font => {
      if (!font.private) {
        const { id } = font;
        flags[id] = null;

        const fontInstalled = find(installedFonts || [], f => f.id === font.id);
        if (!fontInstalled) {
          fonts.push({ ...font, isUpdateAvailable: false });
        } else {
          fonts.push({
            ...font,
            isUpdateAvailable: font.version !== fontInstalled.version
          });
        }
      }
    });

    // set isUpdateAvailable flag
    // const fonts = resourceJson.fonts.map(font => {
    //   const fontInstalled = find(installedFonts || [], f => f.id === font.id);
    //   if (!fontInstalled) return { ...font, isUpdateAvailable: false };

    //   return {
    //     ...font,
    //     isUpdateAvailable: font.version !== fontInstalled.version
    //   };
    // });

    cb(null, {
      ...resourceJson,
      fonts: fonts.reverse(),
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
