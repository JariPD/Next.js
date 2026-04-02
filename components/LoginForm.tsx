"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginData, setLoginData]   = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn]   = useState(false);

  const [regData, setRegData]         = useState({ name: "", email: "", password: "" });
  const [regError, setRegError]       = useState("");
  const [regSuccess, setRegSuccess]   = useState(false);
  const [registering, setRegistering] = useState(false);

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
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
        setLoginError("Incorrect email or password. Try the demo accounts.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleRegister(e: React.SyntheticEvent<HTMLFormElement>) {
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

  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--color-light-gray)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{
        background: "var(--color-white)",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        padding: "48px 32px 32px",
        width: "100%",
        maxWidth: 440,
      }}>
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 12,
            background: "var(--color-accent)", color: "#fff",
            fontSize: 22, fontWeight: 700, marginBottom: 8,
          }}>
            JD
          </div>
          <p style={{ fontSize: 15, color: "var(--color-gray-text)" }}>Jari Dijk — Portfolio</p>
        </div>

        {/* Tab switcher: Log in / Register */}
        <div style={{
          display: "flex",
          border: "1.5px solid var(--color-border)",
          borderRadius: 6,
          marginBottom: 32,
          overflow: "hidden",
        }}>
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, height: 44,
                background: tab === t ? "var(--color-accent)" : "transparent",
                border: "none", cursor: "pointer",
                fontSize: 15, fontWeight: 500,
                color: tab === t ? "#fff" : "var(--color-gray-text)",
                transition: "background 0.15s, color 0.15s",
                fontFamily: "inherit",
              }}
            >
              {t === "login" ? "Log in" : "Register"}
            </button>
          ))}
        </div>

        {/* ── Log in form ── */}
        {tab === "login" && (
          <form onSubmit={handleLogin}>
            {loginError && (
              <div style={{
                background: "#FFF5F5", border: "1px solid #FEB2B2",
                color: "var(--color-error)", borderRadius: 6,
                padding: "10px 14px", fontSize: 14, marginBottom: 16,
              }}>
                {loginError}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Email</label>
              <input type="email" value={loginData.email}
                onChange={(e) => setLoginData((d) => ({ ...d, email: e.target.value }))}
                placeholder="your@email.com" required className="input"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Password</label>
              <input type="password" value={loginData.password}
                onChange={(e) => setLoginData((d) => ({ ...d, password: e.target.value }))}
                placeholder="••••••••" required className="input"
              />
            </div>
            <button type="submit" disabled={loggingIn}
              className="btn-primary btn-full"
              style={{ opacity: loggingIn ? 0.5 : 1, marginTop: 8 }}>
              {loggingIn ? "Signing in…" : "Log in"}
            </button>

            {/* Demo credentials hint */}
            <div style={{
              marginTop: 24, padding: 16,
              background: "var(--color-light-gray)", borderRadius: 6,
              fontSize: 13, color: "var(--color-gray-text)",
            }}>
              <strong style={{ color: "var(--color-text)" }}>Demo accounts</strong><br />
              Admin:&nbsp; <code style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>jari@email.nl</code> / <code style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>user123</code><br />
              User: <code style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>user@email.nl</code> / <code style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>user123</code>
            </div>
          </form>
        )}

        {/* ── Register form ── */}
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
              { label: "Name",     field: "name"     as const, type: "text",     placeholder: "Your name" },
              { label: "Email",    field: "email"    as const, type: "email",    placeholder: "your@email.com" },
              { label: "Password", field: "password" as const, type: "password", placeholder: "••••••••" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field} style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500 }}>{label}</label>
                <input type={type} value={regData[field]}
                  onChange={(e) => setRegData((d) => ({ ...d, [field]: e.target.value }))}
                  placeholder={placeholder} required className="input"
                />
              </div>
            ))}
            <button type="submit" disabled={registering}
              className="btn-primary btn-full"
              style={{ opacity: registering ? 0.5 : 1, marginTop: 8 }}>
              {registering ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}

        {/* Back to portfolio link */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" className="back-link" style={{ fontSize: 13, color: "var(--color-gray-text)", justifyContent: "center" }}>
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
