import Axios from "axios";

import { env } from "@/config/env";

export const api = Axios.create({ baseURL: env.API_URL });

api.defaults.withCredentials = true;

api.interceptors.request.use((config) => {
  if (config.headers) config.headers.Accept = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message);

    return Promise.reject(error);
  }
);
