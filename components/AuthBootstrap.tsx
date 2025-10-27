"use client";
import { useEffect } from "react";
import axios from "axios";

/**
 * Runs once when the app loads to restore the auth token from localStorage.
 * Ensures axios has the Authorization header set automatically.
 */
export default function AuthBootstrap() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ms_auth");
      if (!raw) return;

      const { access_token, expires_at } = JSON.parse(raw) as {
        access_token?: string;
        expires_at?: number;
      };

      if (expires_at && Date.now() / 1000 > expires_at) {
        localStorage.removeItem("ms_auth");
        return;
      }

      if (access_token) {
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      }
    } catch {
      localStorage.removeItem("ms_auth");
    }
  }, []);

  return null;
}