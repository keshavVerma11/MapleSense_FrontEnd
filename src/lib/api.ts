// src/lib/api.ts
import axios from "axios";
import { getAccessToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:9002",
  headers: { Accept: "application/json" },
});

// Add Authorization: Bearer <token> if present
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
