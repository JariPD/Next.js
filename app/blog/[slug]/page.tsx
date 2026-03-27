import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getPublishedPosts, getPostBySlug } from "@/lib/blog";
import StatusBadge from "@/components/StatusBadge";
import { formatDate, displayName } from "@/lib/format";

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const post = getPostBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const isAdmin = session?.user?.role === "admin";
  const isAuthor = session?.user?.email === post.author;
  const showStatus = isAdmin || isAuthor;

  const formattedDate = formatDate(post.date);

  const container: React.CSSProperties = {
    maxWidth: "var(--container-width)", margin: "0 auto", padding: "0 24px",
  };

  return (
    <main style={{ padding: "64px 0" }}>
      <div style={container}>
        <div style={{ marginBottom: 32 }}>
          <Link href="/#blog" className="back-link">← Back to blog</Link>
        </div>

        <article style={{ maxWidth: 680, margin: "0 auto" }}>
          <header style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              {showStatus && <StatusBadge status={post.status} />}
              <time style={{ fontSize: 14, color: "var(--color-gray-text)" }} dateTime={post.date}>
                {formattedDate}
              </time>
              <span style={{ fontSize: 14, color: "var(--color-gray-text)" }}>·</span>
              <span style={{ fontSize: 14, color: "var(--color-gray-text)" }}>{displayName(post.author)}</span>
            </div>
            <h1 style={{ lineHeight: 1.2, marginBottom: 0 }}>{post.title}</h1>
          </header>

          <div>
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} style={{ marginTop: 40, marginBottom: 16 }}>
                    {block.slice(3)}
                  </h2>
                );
              }
              if (block.startsWith("```")) {
                const code = block.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
                return (
                  <pre key={i} style={{
                    background: "var(--color-light-gray)", border: "1px solid var(--color-border)",
                    borderRadius: 8, padding: 16, overflowX: "auto", fontSize: 14,
                    fontFamily: "'Courier New', monospace", margin: "16px 0",
                  }}>
                    <code>{code}</code>
                  </pre>
                );
              }
              return (
                <p key={i} style={{ color: "var(--color-gray-text)", lineHeight: 1.8, marginBottom: 16, fontSize: 16 }}>
                  {block}
                </p>
              );
            })}
          </div>

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--color-border)" }}>
            <Link href="/#blog" className="back-link">← Back to blog</Link>
          </div>
        </article>
      </div>

      <style>{`
        .back-link {
          display: inline-flex; align-items: center; gap: 6;
          font-size: 14px; font-weight: 500; color: var(--color-accent);
          text-decoration: none; transition: opacity 0.15s;
        }
        .back-link:hover { opacity: 0.7; text-decoration: none; }
      `}</style>
    </main>
  );
}
