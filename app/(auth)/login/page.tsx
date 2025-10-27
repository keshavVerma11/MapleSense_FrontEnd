"use client";
import { useState, CSSProperties, InputHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";

type LoginResponse = {
  access_token: string;
  token_id: string;
  expires_at: number;
  user_id: string;
  username: string;
  email: string;
  role: "user" | "admin" | string;
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [authError, setAuthError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const CONTROL_RADIUS = 14;
  const CONTROL_HEIGHT = 52;
  const COLUMN_GAP = 18;

  const columnStyle: CSSProperties = {
    width: "100%",
    display: "grid",
    gap: COLUMN_GAP,
    boxSizing: "border-box",
  };

  const controlBlock: CSSProperties = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
  };

  function validateFields() {
    const next: typeof fieldErrors = {};
    if (!username.trim()) next.username = "Please fill out this field.";
    if (!password.trim()) next.password = "Please fill out this field.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    if (!validateFields()) return;

    setLoading(true);
    try {
      const { data } = await axios.post<LoginResponse>(
        "http://localhost:9002/api/auth/login",
        { username, password }
      );

      // ✅ Persist auth so it survives reloads
      localStorage.setItem("ms_auth", JSON.stringify(data));

      // ✅ Set axios default Authorization header for this session
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;

      // ✅ Determine redirect target based on role
      const role = data.role?.toLowerCase();
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        (status === 401
          ? "Invalid username or password."
          : "Unable to sign in. Please try again.");
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  }

  const inputBase: CSSProperties = {
    ...controlBlock,
    height: CONTROL_HEIGHT,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#cbd5e1",
    borderRadius: CONTROL_RADIUS,
    padding: "0 16px",
    fontSize: 16,
    outline: "none",
    background: "#fff",
  };

  const inputFocus: CSSProperties = {
    borderColor: "#059669",
    boxShadow: "0 0 0 3px rgba(5,150,105,0.15) inset",
  };

  const linkLike: CSSProperties = {
    color: "#059669",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <main style={{ minHeight: "100svh", background: "#f1f5f9" }}>
      <Header />
      <section style={{ maxWidth: 560, margin: "64px auto", padding: "0 16px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
            padding: 32,
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#0f172a",
              textAlign: "center",
              margin: 0,
            }}
          >
            Sign in to MapleSense
          </h1>
          <p style={{ color: "#64748b", textAlign: "center", marginTop: 10 }}>
            Monitor your taps and buckets in one dashboard
          </p>

          <form noValidate onSubmit={onSubmit} style={{ marginTop: 28 }}>
            <div style={columnStyle}>
              {/* USERNAME */}
              <div style={controlBlock}>
                <label
                  htmlFor="username"
                  style={{ marginBottom: 10, display: "block", fontWeight: 600, color: "#0f172a" }}
                >
                  Username
                </label>
                <InputWithFocusStyles
                  id="username"
                  placeholder="e.g. lebron.james"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={inputBase}
                  focusStyle={inputFocus}
                  autoComplete="username"
                />
                {fieldErrors.username && <HelperBubble message={fieldErrors.username} />}
              </div>

              {/* PASSWORD */}
              <div style={controlBlock}>
                <label
                  htmlFor="password"
                  style={{ marginBottom: 10, display: "block", fontWeight: 600, color: "#0f172a" }}
                >
                  Password
                </label>
                <InputWithFocusStyles
                  id="password"
                  type="password"
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputBase}
                  focusStyle={inputFocus}
                  autoComplete="current-password"
                />
                {fieldErrors.password && <HelperBubble message={fieldErrors.password} />}
              </div>

              {/* AUTH ERROR */}
              {authError && (
                <div
                  role="alert"
                  style={{
                    ...controlBlock,
                    background: "#fef2f2",
                    color: "#b91c1c",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fecaca",
                    borderRadius: CONTROL_RADIUS,
                    padding: "12px 14px",
                    fontSize: 14,
                  }}
                >
                  {authError}
                </div>
              )}

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...controlBlock,
                  background: loading ? "#10b981" : "#059669",
                  opacity: loading ? 0.8 : 1,
                  color: "#fff",
                  borderRadius: CONTROL_RADIUS,
                  fontWeight: 700,
                  fontSize: 20,
                  height: 64,
                  lineHeight: "64px",
                  textAlign: "center",
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.08)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                aria-label="Sign in"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Footer actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 22,
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Forgot Password?</p>

            <a
              onClick={(e) => {
                e.preventDefault();
                router.push("/create_acct");
              }}
              href="/create_acct"
              style={linkLike}
              aria-label="Create a new account"
            >
              New User?
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Input with inner focus ring */
function InputWithFocusStyles(
  props: InputHTMLAttributes<HTMLInputElement> & { focusStyle?: CSSProperties }
) {
  const { focusStyle, style, onFocus, onBlur, ...rest } = props;
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...rest}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={{ ...style, ...(focused ? focusStyle : {}) }}
    />
  );
}

function HelperBubble({ message }: { message: string }) {
  return (
    <div
      style={{
        marginTop: 8,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#fff7ed",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#fed7aa",
        color: "#9a3412",
        borderRadius: 9999,
        padding: "8px 12px",
        fontSize: 13,
        boxSizing: "border-box",
      }}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: 9999,
          background: "#f59e0b",
          boxShadow: "0 0 0 2px rgba(245,158,11,0.25)",
        }}
      />
      {message}
    </div>
  );
}
