import axios from "axios";
import { getAccessToken } from "../utils/storage";

export const API_BASE = "https://bookish-cod-56vrrp4pq7jcr49-8000.app.github.dev";

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
