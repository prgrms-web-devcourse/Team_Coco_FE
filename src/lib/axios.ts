import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import { history } from "@/routes";
import { storage } from "@/utils/storage";

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = storage.getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      token: `${token}`,
    };
  }
  return config;
});

axios.interceptors.response.use(undefined, (error) => {
  if (Axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    if (statusCode === 401 || statusCode === 403) {
      storage.clearToken();
      storage.clearUserId();
      history.replace("/login");
    }
  }
  return Promise.reject(error);
});
