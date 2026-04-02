import Link from "next/link";
import { auth } from "@/auth";
import { getPublishedPosts } from "@/lib/blog";
import BlogPostCard from "@/components/BlogPostCard";
import Button from "@/components/Button";
import RevealInit from "@/components/RevealInit";
import { container, section } from "@/lib/styles";

export default async function BlogPage() {
  const session = await auth();
  const posts = getPublishedPosts();

  return (
    <main style={section}>
      <div style={container}>
        <RevealInit />

        <div style={{ marginBottom: 40 }}>
          <Link href="/" className="back-link" style={{ marginBottom: 24, display: "inline-flex" }}>
            ← Back to portfolio
          </Link>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ marginBottom: 8 }}>Blog</h1>
              <p style={{ color: "var(--color-gray-text)", maxWidth: 560 }}>
                Technical articles and insights from my day-to-day work as a developer.
              </p>
            </div>
            {/* Write a post (logged in) or prompt to sign in */}
            {session?.user ? (
              <Button variant="primary" href="/blog/new">Write a post</Button>
            ) : (
              <Button variant="secondary" href="/login">Sign in to write</Button>
            )}
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="blog-grid">
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
    </main>
  );
}
