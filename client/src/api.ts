import axios from "axios";
import { MARKETPLACE_SERVER } from "./config";

export const signin = async (formData: any) => {
  try {
    const response = await axios.post(
      `${MARKETPLACE_SERVER}/user/signin`,
      formData,
      { withCredentials: true }
    );
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error("Signin failed:", error.response.data);
    return { success: false, response: error.response.data };
  }
};

export const signup = async (formData: any) => {
  try {
    const response = await axios.post(
      `${MARKETPLACE_SERVER}/user/signup`,
      formData,
      { withCredentials: true }
    );
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error("Signup failed:", error.response.data);
    return { success: false, response: error.response.data };
  }
};

export const signout = async () => {
  try {
    const response = await axios.get(`${MARKETPLACE_SERVER}/user/signout`);
    localStorage.removeItem("mozata-session");
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error("Signout failed:", error.response.data);
    return { success: false, response: error.response.data };
  }
};

export const fetchAllRestaurants = async (token: string) => {
  try {
    const response = await axios.get(`${MARKETPLACE_SERVER}/restaurant/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error("Fetch restaurants failed:", error.response.data);
    return { success: false, response: error.response.data };
  }
};

export const fetchRestaurant = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${MARKETPLACE_SERVER}/restaurant/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error("Fetch restaurants failed:", error.response.data);
    return { success: false, response: error.response.data };
  }
};

export const placeOrder = async (token: string, formData: any) => {
  try {
    const response = await axios.post(
      `${MARKETPLACE_SERVER}/order/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error("Fetch restaurants failed:", error.response.data);
    return { success: false, response: error.response.data };
  }
};
