// src/lib/auth.ts
export type StoredAuth = {
  access_token: string;
  token_id: string;
  expires_at: number;
  user_id: string;
  username: string;
  email: string;
  role: string;
};

export function getAccessToken(): string | null {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem("ms_auth") : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredAuth>;
    return parsed.access_token ?? null;
  } catch {
    return null;
  }
}
