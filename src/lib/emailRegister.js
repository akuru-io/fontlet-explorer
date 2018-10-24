import axios from "axios";
import { API_BASE_URL } from "../config";

export const fetchUserEmail = async userEmail => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}registeruser`,
      data: {
        email: userEmail
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
