import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BlogPostForm from "@/components/BlogPostForm";

const container: React.CSSProperties = { maxWidth: "var(--container-width)", margin: "0 auto", padding: "0 24px" };

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  return (
    <main style={{ padding: "64px 0" }}>
      <div style={container}>
        <div style={{ marginBottom: 32 }}>
          <Link href="/dashboard" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 500, color: "var(--color-accent)", textDecoration: "none",
          }}>
            ← Back to dashboard
          </Link>
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>New Post</h1>
        <p style={{ color: "var(--color-gray-text)", marginBottom: 32 }}>
          Posts are reviewed before being published to the blog.
        </p>
        <BlogPostForm authorEmail={session.user.email} />
      </div>
    </main>
  );
}
