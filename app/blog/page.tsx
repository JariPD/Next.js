import Link from "next/link";
import { auth } from "@/auth";
import { getPublishedPosts } from "@/lib/blog";
import BlogPostCard from "@/components/BlogPostCard";
import RevealInit from "@/components/RevealInit";

const container: React.CSSProperties = { maxWidth: "var(--container-width)", margin: "0 auto", padding: "0 24px" };

export default async function BlogPage() {
  const session = await auth();
  const posts = getPublishedPosts();

  return (
    <main style={{ padding: "64px 0" }}>
      <div style={container}>
        <RevealInit />

        <div style={{ marginBottom: 40 }}>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--color-accent)", textDecoration: "none", marginBottom: 24, }}
          >
            ← Back to portfolio
          </Link>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ marginBottom: 8 }}>Blog</h1>
              <p style={{ color: "var(--color-gray-text)", maxWidth: 560 }}>
                Technical articles and insights from my day-to-day work as a developer.
              </p>
            </div>
            {session?.user ? (
              <Link href="/blog/new" style={{
                height: 48, padding: "0 24px", background: "var(--color-accent)", color: "#fff",
                border: "none", borderRadius: 6, fontSize: 16, fontWeight: 500,
                textDecoration: "none", display: "inline-flex", alignItems: "center",
              }}>
                Write a post
              </Link>
            ) : (
              <Link href="/login" style={{
                height: 48, padding: "0 20px", background: "transparent", color: "var(--color-accent)",
                border: "1.5px solid var(--color-accent)", borderRadius: 6, fontSize: 16, fontWeight: 500,
                textDecoration: "none", display: "inline-flex", alignItems: "center",
              }}>
                Sign in to write
              </Link>
            )}
          </div>
        </div>

        {posts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="blog-grid">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-gray-text)" }}>
            <p style={{ fontSize: 18 }}>No posts yet.</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Be the first to write one!</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr !important; } }
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </main>
  );
}
