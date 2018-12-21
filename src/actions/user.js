import axios from "axios";
import { WT_API_BASE_URL } from "../config";
import { getLocalCacheInstance } from "./_utils";

const updateUserEmail = async ({ email }) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${WT_API_BASE_URL}/registeruser`,
      data: {
        email
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

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

    // Send User Data
    updateUserEmail(user);
  } catch (error) {
    cb({ message: "Error registering..", params: error }, null);
  }
};
