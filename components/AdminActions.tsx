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
  const [error, setError] = useState("");
  const router = useRouter();

  async function setStatus(status: Status) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/blog/posts/${postId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        setError("Failed to update status.");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <p style={{ fontSize: 13, color: "var(--color-error)", marginBottom: 6 }}>{error}</p>
      )}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
      {currentStatus !== "published" && (
        <button onClick={() => setStatus("published")} disabled={loading}
          className="btn-success" style={{ opacity: loading ? 0.4 : 1 }}>
          Approve
        </button>
      )}
      {currentStatus !== "rejected" && (
        <button onClick={() => setStatus("rejected")} disabled={loading}
          className="btn-danger" style={{ opacity: loading ? 0.4 : 1 }}>
          Reject
        </button>
      )}
      {currentStatus !== "pending" && (
        <button onClick={() => setStatus("pending")} disabled={loading}
          className="btn-outline" style={{ opacity: loading ? 0.4 : 1 }}>
          Set Pending
        </button>
      )}
      </div>
    </div>
  );
}
