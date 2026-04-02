"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Status } from "@/lib/blog";

export default function AdminActions({
  postId,
  currentStatus,
}: {
  postId: number;
  currentStatus: Status;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function setStatus(status: Status) {
    setLoading(true);
    try {
      await fetch(`/api/blog/posts/${postId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);
    try {
      await fetch(`/api/blog/posts/${postId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const btnBase: React.CSSProperties = {
    height: 40, padding: "0 20px", border: "none", borderRadius: 6,
    fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
    opacity: loading ? 0.4 : 1, transition: "background-color 0.15s",
  };

  return (
    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
      {currentStatus !== "published" && (
        <button onClick={() => setStatus("published")} disabled={loading}
          style={{ ...btnBase, background: "var(--color-success)", color: "#fff" }}>
          Approve
        </button>
      )}
      {currentStatus !== "rejected" && (
        <button onClick={() => setStatus("rejected")} disabled={loading}
          style={{ ...btnBase, background: "var(--color-error)", color: "#fff" }}>
          Reject
        </button>
      )}
      {currentStatus !== "pending" && (
        <button onClick={() => setStatus("pending")} disabled={loading}
          style={{ ...btnBase, background: "none", color: "var(--color-text)", border: "1.5px solid var(--color-border)" }}>
          Set Pending
        </button>
      )}
      <button onClick={handleDelete} disabled={loading}
        style={{ ...btnBase, background: "none", color: "var(--color-error)", border: "1.5px solid var(--color-error)" }}>
        Delete
      </button>
    </div>
  );
}
