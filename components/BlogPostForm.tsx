"use client";

import React, { useState, useEffect, useRef } from "react";
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

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
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
            placeholder="Give your post a title" className="input"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          <label style={{ fontSize: 14, fontWeight: 500 }}>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here…"
            className="input"
            style={{ height: 200, resize: "vertical", padding: 12 }}
          />
        </div>
        <p style={{ fontSize: 13, color: "var(--color-gray-text)", marginBottom: 16 }}>
          Posting as <strong style={{ color: "var(--color-text)" }}>{authorEmail}</strong>
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" disabled={submitting} className="btn-primary" style={{ opacity: submitting ? 0.5 : 1 }}>
            {submitting ? "Submitting…" : "Submit post"}
          </button>
        </div>
      </form>
    </div>
  );
}
