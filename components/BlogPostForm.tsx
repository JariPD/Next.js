"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function BlogPostForm({ authorEmail }: { authorEmail: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setTitle("");
      setContent("");
      setSuccess(true);
      router.refresh();
      timerRef.current = setTimeout(() => setSuccess(false), 7000);
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    height: 44, border: "1.5px solid var(--color-border)",
    borderRadius: 6, padding: "0 12px", fontSize: 16, fontFamily: "inherit",
    color: "var(--color-text)", background: "var(--color-white)",
    outline: "none", width: "100%", transition: "border-color 0.15s, box-shadow 0.15s",
  };

  return (
    <div style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: 8, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: 720 }}>
      <h3 style={{ marginBottom: 24 }}>Write a post</h3>

      {success && (
        <div style={{ background: "#F0FFF4", border: "1px solid #9AE6B4", color: "var(--color-success)", borderRadius: 6, padding: "12px 16px", fontSize: 14, marginBottom: 24 }}>
          Post submitted! It will appear after admin review.
        </div>
      )}
      {error && (
        <div style={{ background: "#FFF5F5", border: "1px solid #FEB2B2", color: "var(--color-error)", borderRadius: 6, padding: "12px 16px", fontSize: 14, marginBottom: 24 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 14, fontWeight: 500 }}>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title" style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(49,130,206,0.15)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          <label style={{ fontSize: 14, fontWeight: 500 }}>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here…"
            style={{
              border: "1.5px solid var(--color-border)", borderRadius: 6, padding: 12,
              fontSize: 16, fontFamily: "inherit", color: "var(--color-text)", background: "var(--color-white)",
              outline: "none", width: "100%", height: 200, resize: "vertical", transition: "border-color 0.15s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(49,130,206,0.15)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>
        <p style={{ fontSize: 13, color: "var(--color-gray-text)", marginBottom: 16 }}>
          Posting as <strong style={{ color: "var(--color-text)" }}>{authorEmail}</strong>
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" disabled={submitting} style={{
            height: 48, padding: "0 24px", background: "var(--color-accent)", color: "#fff",
            border: "none", borderRadius: 6, fontSize: 16, fontWeight: 500,
            cursor: "pointer", fontFamily: "inherit", opacity: submitting ? 0.5 : 1,
            transition: "background-color 0.15s",
          }}
            onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#2B6CB0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-accent)"; }}
          >
            {submitting ? "Submitting…" : "Submit post"}
          </button>
        </div>
      </form>
    </div>
  );
}
