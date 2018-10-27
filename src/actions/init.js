import { getLocalCacheInstance, fetchResourceJSON } from "./_utils";

const init = async (cb = () => {}) => {
  try {
    const localCache = getLocalCacheInstance();

    // Check for existing user in localCache
    const resourceJson = await fetchResourceJSON();
    const user = await localCache.findOne({ type: "INIT" });
    const userModifed = { ...user, lastSeen: new Date() };
    let installedFonts = null;

    // If the user already registered
    if (user) {
      // Update lastSeen
      localCache.update({ type: "INIT" }, userModifed);
      // Fetch Installed fonts
      installedFonts = localCache.find({ type: "INSTALLED" });
    }

    cb(null, {
      ...resourceJson,
      user,
      installedFonts: installedFonts || [],
      isUserRegistered: !!user
    });
  } catch (error) {
    cb({ message: "Initializing failed.", params: error }, null);
  }
};

export default init;
