import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API_BASE = "http://192.168.1.50:8000/api"; 
// METTI IP DEL SERVER (Django) IN LAN

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
