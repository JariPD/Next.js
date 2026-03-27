"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [regData, setRegData] = useState({ name: "", email: "", password: "" });
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [registering, setRegistering] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const result = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });
      if (result?.error) {
        setLoginError("Invalid email or password.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    setRegistering(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });
      if (!res.ok) {
        const data = await res.json();
        setRegError(data.error ?? "Registration failed.");
        return;
      }
      setRegSuccess(true);
      const result = await signIn("credentials", {
        email: regData.email,
        password: regData.password,
        redirect: false,
      });
      if (!result?.error) {
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setRegistering(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    height: 44, border: "1.5px solid var(--color-border)",
    borderRadius: 6, padding: "0 12px", fontSize: 16, fontFamily: "inherit",
    color: "var(--color-text)", background: "var(--color-white)",
    outline: "none", width: "100%", transition: "border-color 0.15s, box-shadow 0.15s",
  };

  return (
    <main style={{
      minHeight: "100vh", background: "var(--color-light-gray)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "var(--color-white)", borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        padding: "64px 32px", width: "100%", maxWidth: 440,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 12, background: "var(--color-accent)",
            color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 8,
          }}>JD</div>
          <p style={{ fontSize: 15, color: "var(--color-gray-text)" }}>Jari Dijk — Portfolio</p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", border: "1.5px solid var(--color-border)",
          borderRadius: 6, marginBottom: 32, overflow: "hidden",
        }}>
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, height: 44, background: tab === t ? "var(--color-accent)" : "none",
                border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500,
                color: tab === t ? "#fff" : "var(--color-gray-text)",
                transition: "background 0.15s, color 0.15s", fontFamily: "inherit",
              }}
            >
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Login form */}
        {tab === "login" && (
          <form onSubmit={handleLogin}>
            {loginError && (
              <div style={{
                background: "#FFF5F5", border: "1px solid #FEB2B2", color: "var(--color-error)",
                borderRadius: 6, padding: "10px 14px", fontSize: 14, marginBottom: 16,
              }}>
                {loginError}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Email</label>
              <input type="email" value={loginData.email} onChange={(e) => setLoginData((d) => ({ ...d, email: e.target.value }))}
                placeholder="your@email.com" required style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Password</label>
              <input type="password" value={loginData.password} onChange={(e) => setLoginData((d) => ({ ...d, password: e.target.value }))}
                placeholder="••••••••" required style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              />
            </div>
            <button type="submit" disabled={loggingIn} style={{
              width: "100%", height: 48, background: "var(--color-accent)", color: "#fff",
              border: "none", borderRadius: 6, fontSize: 16, fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit", opacity: loggingIn ? 0.5 : 1, marginTop: 8,
            }}>
              {loggingIn ? "Signing in…" : "Sign in"}
            </button>
            <div style={{ marginTop: 24, padding: 16, background: "var(--color-light-gray)", borderRadius: 6, fontSize: 13, color: "var(--color-gray-text)" }}>
              <strong style={{ color: "var(--color-text)" }}>Demo credentials</strong><br />
              Email: <code style={{ fontFamily: "'Courier New', monospace", background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>jari@email.nl</code><br />
              Password: <code style={{ fontFamily: "'Courier New', monospace", background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>user123</code>
            </div>
          </form>
        )}

        {/* Register form */}
        {tab === "register" && (
          <form onSubmit={handleRegister}>
            {regSuccess && (
              <div style={{ background: "#F0FFF4", border: "1px solid #9AE6B4", color: "var(--color-success)", borderRadius: 6, padding: "10px 14px", fontSize: 14, marginBottom: 16 }}>
                Account created! Signing you in…
              </div>
            )}
            {regError && (
              <div style={{ background: "#FFF5F5", border: "1px solid #FEB2B2", color: "var(--color-error)", borderRadius: 6, padding: "10px 14px", fontSize: 14, marginBottom: 16 }}>
                {regError}
              </div>
            )}
            {[
              { label: "Name", field: "name" as const, type: "text", placeholder: "Your name" },
              { label: "Email", field: "email" as const, type: "email", placeholder: "your@email.com" },
              { label: "Password", field: "password" as const, type: "password", placeholder: "••••••••" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field} style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500 }}>{label}</label>
                <input type={type} value={regData[field]} onChange={(e) => setRegData((d) => ({ ...d, [field]: e.target.value }))}
                  placeholder={placeholder} required style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
              </div>
            ))}
            <button type="submit" disabled={registering} style={{
              width: "100%", height: 48, background: "var(--color-accent)", color: "#fff",
              border: "none", borderRadius: 6, fontSize: 16, fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit", opacity: registering ? 0.5 : 1, marginTop: 8,
            }}>
              {registering ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
