"use client";

import { useState, useEffect, useRef } from "react";

type FieldErrors = { name?: string; email?: string; message?: string };

function fieldStyle(error?: string, success?: boolean) {
  return {
    height: 44, border: `1.5px solid ${error ? "var(--color-error)" : success ? "var(--color-success)" : "var(--color-border)"}`,
    borderRadius: 6, padding: "0 12px", fontSize: 16, fontFamily: "inherit",
    color: "var(--color-text)", background: "var(--color-white)",
    outline: "none", width: "100%", boxSizing: "border-box" as const,
    transition: "border-color 0.15s, box-shadow 0.15s",
  };
}

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (values.name.trim().length < 2) errs.name = "Please enter your name (at least 2 characters)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = "Please enter a valid email address";
    if (values.message.trim().length < 10) errs.message = "Please enter your message (at least 10 characters)";
    return errs;
  }

  function validateField(name: keyof typeof values, value: string) {
    const errs: FieldErrors = {};
    if (name === "name" && value.trim().length < 2) errs.name = "Please enter your name";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errs.email = "Please enter a valid email address";
    if (name === "message" && value.trim().length < 10) errs.message = "Please enter your message (at least 10 characters)";
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setValues({ name: "", email: "", message: "" });
      setTouched({});
      setSuccess(true);
      timerRef.current = setTimeout(() => setSuccess(false), 7000);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div style={{
        background: "#F0FFF4", border: "1px solid #9AE6B4",
        borderRadius: 8, padding: 32, textAlign: "center", color: "var(--color-success)",
      }}>
        <h3 style={{ color: "var(--color-success)", marginBottom: 8 }}>Message sent!</h3>
        <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {(["name", "email", "message"] as const).map((field) => (
        <div key={field} style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
          <label htmlFor={`contact-${field}`} style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          {field === "message" ? (
            <textarea
              id="contact-message"
              value={values.message}
              onChange={(e) => { setValues((v) => ({ ...v, message: e.target.value })); if (errors.message) setErrors((err) => ({ ...err, message: undefined })); }}
              onBlur={() => { setTouched((t) => ({ ...t, message: true })); validateField("message", values.message); }}
              placeholder="Tell me about your project or question…"
              style={{
                border: `1.5px solid ${errors.message ? "var(--color-error)" : touched.message && !errors.message && values.message.trim().length >= 10 ? "var(--color-success)" : "var(--color-border)"}`,
                borderRadius: 6, padding: 12, fontSize: 16, fontFamily: "inherit",
                color: "var(--color-text)", background: "var(--color-white)",
                outline: "none", width: "100%", height: 120, resize: "vertical",
                transition: "border-color 0.15s",
              }}
            />
          ) : (
            <input
              id={`contact-${field}`}
              type={field === "email" ? "email" : "text"}
              value={values[field]}
              onChange={(e) => { setValues((v) => ({ ...v, [field]: e.target.value })); if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined })); }}
              onBlur={() => { setTouched((t) => ({ ...t, [field]: true })); validateField(field, values[field]); }}
              placeholder={field === "name" ? "Your name" : "your@email.com"}
              style={fieldStyle(errors[field], touched[field] && !errors[field] && values[field].trim().length > 0)}
            />
          )}
          {errors[field] && <span style={{ fontSize: 13, color: "var(--color-error)", minHeight: 18 }}>{errors[field]}</span>}
        </div>
      ))}
      <button
        type="submit"
        disabled={submitting}
        style={{
          width: "100%", height: 48, background: "var(--color-accent)", color: "#fff",
          border: "none", borderRadius: 6, fontSize: 16, fontWeight: 500,
          cursor: "pointer", transition: "background-color 0.15s", fontFamily: "inherit",
          opacity: submitting ? 0.5 : 1,
        }}
        onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#2B6CB0"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-accent)"; }}
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
