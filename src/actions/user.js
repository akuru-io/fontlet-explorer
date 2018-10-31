import axios from "axios";
import { API_BASE_URL } from "../config";
import { getLocalCacheInstance } from "./_utils";

const sendUserStats = async ({ email }) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}registeruser`,
      data: {
        email
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async user => {
  try {
    // Create the user on localCache
    const localCache = getLocalCacheInstance();
    await localCache.update(
      { type: "INIT" },
      { type: "INIT", lastSeen: new Date(), ...user },
      { upsert: true, returnUpdatedDocs: true }
    );

    await sendUserStats(user);

    return { ...user };
  } catch (error) {
    throw Error({ message: "User registration failed!.", params: error });
  }
};
