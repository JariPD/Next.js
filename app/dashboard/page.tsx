import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getPostsByAuthor } from "@/lib/blog";
import StatusBadge from "@/components/StatusBadge";

const container: React.CSSProperties = { maxWidth: "var(--container-width)", margin: "0 auto", padding: "0 24px" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const posts = getPostsByAuthor(session.user.email);
  const published = posts.filter((p) => p.status === "published").length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const rejected = posts.filter((p) => p.status === "rejected").length;

  return (
    <main style={{ padding: "64px 0" }}>
      <div style={container}>
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: 32, marginBottom: 4 }}>Dashboard</h1>
            <p style={{ fontSize: 14, color: "var(--color-gray-text)" }}>
              Welcome back, {session.user.name ?? session.user.email}
            </p>
          </div>
          <Link href="/blog/new" className="btn-primary">New post</Link>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { label: "Published", count: published, color: "var(--color-success)" },
            { label: "Pending", count: pending, color: "var(--color-warning)" },
            { label: "Rejected", count: rejected, color: "var(--color-error)" },
          ].map(({ label, count, color }) => (
            <div key={label} className="stat-card">
              <div className="stat-num" style={{ color }}>{count}</div>
              <div className="stat-lbl">{label}</div>
            </div>
          ))}
        </div>

        {/* Post list */}
        <div className="posts-section">
          <h2>Your Posts</h2>
          {posts.length === 0 ? (
            <div className="posts-list" style={{ textAlign: "center", padding: 48 }}>
              <p style={{ color: "var(--color-gray-text)", marginBottom: 16 }}>
                You haven't written any posts yet.
              </p>
              <Link href="/blog/new" className="btn-primary">Write your first post</Link>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="post-row">
                  <div className="post-row-main">
                    {post.status === "published" ? (
                      <Link href={`/blog/${post.slug}`} className="post-title">
                        {post.title}
                      </Link>
                    ) : (
                      <span className="post-title">{post.title}</span>
                    )}
                    <StatusBadge status={post.status} />
                  </div>
                  <div className="post-row-meta">
                    <span style={{ fontSize: 13, color: "var(--color-gray-text)" }}>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .btn-primary {
          height: 48px; padding: 0 24px; background: var(--color-accent); color: #fff;
          border: none; border-radius: 6px; font-size: 16px; font-weight: 500;
          cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;
          transition: background-color 0.15s; font-family: inherit;
        }
        .btn-primary:hover { background-color: #2B6CB0; text-decoration: none; }
        .page-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 32px; flex-wrap: wrap; gap: 16px;
        }
        .stats-row { display: flex; gap: 24px; margin-bottom: 32px; flex-wrap: wrap; }
        .stat-card {
          flex: 1; min-width: 140px; background: var(--color-white);
          border: 1px solid var(--color-border); border-radius: 8px;
          padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); text-align: center;
        }
        .stat-num { font-size: 36px; font-weight: 700; line-height: 1; }
        .stat-lbl { font-size: 13px; color: var(--color-gray-text); margin-top: 4px; }
        .posts-section h2 { font-size: 22px; margin-bottom: 24px; }
        .posts-list {
          background: var(--color-white); border: 1px solid var(--color-border);
          border-radius: 8px; overflow: hidden;
        }
        .post-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px; gap: 16px;
          border-bottom: 1px solid var(--color-border); transition: background 0.15s;
        }
        .post-row:last-child { border-bottom: none; }
        .post-row:hover { background: var(--color-light-gray); }
        .post-row-main { display: flex; align-items: center; gap: 16px; min-width: 0; }
        .post-title {
          font-size: 15px; font-weight: 500; color: var(--color-text);
          text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        a.post-title:hover { color: var(--color-accent); text-decoration: underline; }
        .post-row-meta { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        @media (max-width: 768px) {
          .stats-row { flex-direction: column; }
          .page-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}
