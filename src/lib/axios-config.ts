import axios from "axios";
import Cookies from "js-cookie";

const axiosAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: process.env.API_URL,
  withCredentials: true,
  timeout: 30000,
});

const axiosAuthAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: process.env.AUTH_URL,
  withCredentials: true,
  timeout: 30000,
});

axiosAPI.interceptors.request.use(async (config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    return Promise.reject({ redirectToLogin: true });
  }
  return config;
});

export { axiosAPI, axiosAuthAPI };
