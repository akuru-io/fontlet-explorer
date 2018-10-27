import { getLocalCacheInstance } from "./_utils";

export const registerUser = async (user, cb = () => {}) => {
  try {
    // Create User on localCache
    const localCache = getLocalCacheInstance();
    const userUpdated = await localCache.update(
      { type: "INIT" },
      { type: "INIT", lastSeen: new Date(), ...user },
      { upsert: true, returnUpdatedDocs: true }
    );
    cb(null, {
      isUserRegistered: true,
      user: userUpdated
    });
  } catch (error) {
    cb({ message: "Error registering..", params: error }, null);
  }
};
