import axios from "axios";
import Cookies from "js-cookie";

const axiosAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 30000,
});

const axiosAuthAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_AUTH_URL,
  withCredentials: true,
  timeout: 30000,
});

axiosAPI.interceptors.request.use(async (config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    return Promise.reject({ redirectToLogin: true });
  }
  return config;
});

axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          return Promise.reject({ redirectToLogin: true });
        }

        const res = await axiosAuthAPI.post("refresh-token", {
          refreshToken: refreshToken,
        });
        const newAccessToken = res.data.access;
        Cookies.set("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAPI(originalRequest);
      } catch (err) {
        console.error(err);
        console.log(
          "Refresh token has expired or invalid. Redirecting to login...",
        );
        return Promise.reject({ redirectToLogin: true });
      }
    }
  },
);

export { axiosAPI, axiosAuthAPI };
