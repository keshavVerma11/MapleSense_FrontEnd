"use client";
import { useState, CSSProperties, InputHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";

export default function CreateAccountPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [submitError, setSubmitError] = useState("");
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

  function validate() {
    const next: typeof fieldErrors = {};
    if (!username.trim()) next.username = "Please fill out this field.";
    else if (!/^[a-zA-Z0-9._-]{3,30}$/.test(username))
      next.username = "3–30 chars, letters/numbers ._-";
    if (!email.trim()) next.email = "Please fill out this field.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email.";
    if (!password.trim()) next.password = "Please fill out this field.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setLoading(true);
    try {
      // Send payload including role
      await axios.post("http://localhost:9002/api/auth/register", {
        username,
        email,
        password,
        role: "user",
      });

      // redirect to login on success
      router.push("/login");
    } catch (err: any) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        (status === 409
          ? "That username or email is already in use."
          : status === 400
          ? "Invalid input. Please check your details."
          : "Something went wrong. Please try again.");
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  }

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
            Create your MapleSense account
          </h1>
          <p style={{ color: "#64748b", textAlign: "center", marginTop: 10 }}>
            Set up your profile to access the dashboard
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
                  placeholder="e.g. keshav.verma"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={inputBase}
                  focusStyle={inputFocus}
                  autoComplete="username"
                />
                {fieldErrors.username && <HelperBubble message={fieldErrors.username} />}
              </div>

              {/* EMAIL */}
              <div style={controlBlock}>
                <label
                  htmlFor="email"
                  style={{ marginBottom: 10, display: "block", fontWeight: 600, color: "#0f172a" }}
                >
                  Email
                </label>
                <InputWithFocusStyles
                  id="email"
                  type="email"
                  placeholder="e.g. keshav@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputBase}
                  focusStyle={inputFocus}
                  autoComplete="email"
                />
                {fieldErrors.email && <HelperBubble message={fieldErrors.email} />}
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
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputBase}
                  focusStyle={inputFocus}
                  autoComplete="new-password"
                />
                {fieldErrors.password && <HelperBubble message={fieldErrors.password} />}
              </div>

              {/* SUBMIT ERROR */}
              {submitError && (
                <div
                  role="alert"
                  style={{
                    ...controlBlock,
                    background: "#fef2f2",
                    color: "#b91c1c",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fecaca",
                    borderRadius: 14,
                    padding: "12px 14px",
                    fontSize: 14,
                  }}
                >
                  {submitError}
                </div>
              )}

              {/* CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...controlBlock,
                  background: loading ? "#10b981" : "#059669",
                  opacity: loading ? 0.8 : 1,
                  color: "#fff",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 20,
                  height: 64,
                  lineHeight: "64px",
                  textAlign: "center",
                  boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.08)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                aria-label="Create account"
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </div>
          </form>

          {/* Back to sign in */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
            <a href="/login" style={linkLike} aria-label="Go back to sign in">
              Back to Sign in
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Shared input with inner focus ring */
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