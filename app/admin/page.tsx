import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllPosts } from "@/lib/blog";
import StatusBadge from "@/components/StatusBadge";
import AdminActions from "./AdminActions";

const container: React.CSSProperties = { maxWidth: "var(--container-width)", margin: "0 auto", padding: "0 24px" };

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/");

  const posts = getAllPosts();
  const published = posts.filter((p) => p.status === "published").length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const rejected = posts.filter((p) => p.status === "rejected").length;

  return (
    <main style={{ padding: "64px 0" }}>
      <div style={container}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, marginBottom: 4 }}>Admin Panel</h1>
          <p style={{ fontSize: 14, color: "var(--color-gray-text)" }}>Review and moderate community posts.</p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
          {[
            { label: "Published", count: published, color: "var(--color-success)" },
            { label: "Pending", count: pending, color: "var(--color-warning)" },
            { label: "Rejected", count: rejected, color: "var(--color-error)" },
          ].map(({ label, count, color }) => (
            <div key={label} style={{
              flex: 1, minWidth: 140, background: "var(--color-white)",
              border: "1px solid var(--color-border)", borderRadius: 8,
              padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center",
            }}>
              <div style={{ fontSize: 36, fontWeight: 700, color, lineHeight: 1 }}>{count}</div>
              <div style={{ fontSize: 13, color: "var(--color-gray-text)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Posts list */}
        <div className="admin-posts-list">
          {posts.map((post, idx) => (
            <div key={post.id} className="admin-post-row" style={{ borderBottom: idx < posts.length - 1 ? "1px solid var(--color-border)" : "none" }}>
              <div className="admin-post-header">
                <div className="admin-post-meta">
                  <strong style={{ fontSize: 15, color: "var(--color-text)" }}>{post.title}</strong>
                  <StatusBadge status={post.status} />
                </div>
                <AdminActions postId={post.id} currentStatus={post.status} />
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "var(--color-gray-text)" }}>{post.author}</span>
                <span style={{ fontSize: 13, color: "var(--color-gray-text)" }}>·</span>
                <span style={{ fontSize: 13, color: "var(--color-gray-text)" }}>{post.date}</span>
              </div>
              <p className="admin-post-preview">{post.preview}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .admin-posts-list {
          background: var(--color-white); border: 1px solid var(--color-border);
          border-radius: 8px; overflow: hidden;
        }
        .admin-post-row { padding: 24px; transition: background 0.15s; }
        .admin-post-row:hover { background: var(--color-light-gray); }
        .admin-post-header {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; margin-bottom: 8px; flex-wrap: wrap;
        }
        .admin-post-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .admin-post-preview { color: var(--color-gray-text); font-size: 14px; line-height: 1.5; margin: 0; }
        @media (max-width: 768px) {
          .admin-post-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}
