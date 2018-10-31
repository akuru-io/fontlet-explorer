import find from "lodash/find";
import { getLocalCacheInstance, fetchResourceJSON } from "./_utils";

const init = async () => {
  try {
    // Check for existing user in localCache
    const localCache = getLocalCacheInstance();
    const user = await localCache.findOne({ type: "INIT" });
    const userModifed = { ...user, lastSeen: new Date() };

    let installedFonts = null;

    // If the user already registered;
    if (user) {
      localCache.update({ type: "INIT" }, userModifed);

      // Fetch Installed fonts
      installedFonts = await localCache.find({ type: "INSTALLED" });
    }

    // Fetch resourceJson
    const resourceJson = await fetchResourceJSON();

    // Set flags
    const fonts = resourceJson.fonts.map(font => {
      const fontModified = {
        ...font,
        installing: null,
        uninstalling: null,
        updating: null,
        installed: false,
        isUpdateAvailable: false
      };

      const fontInstalled = find(installedFonts || [], f => f.id === font.id);
      const installed = !!fontInstalled;
      const isUpdateAvailable =
        (fontInstalled && fontInstalled.version !== font.version) || false;

      return {
        ...fontModified,
        installed,
        isUpdateAvailable
      };
    });

    return { ...resourceJson, fonts, user };
  } catch (error) {
    throw Error({ message: "Initializing failed.", params: error });
  }
};

export default init;
