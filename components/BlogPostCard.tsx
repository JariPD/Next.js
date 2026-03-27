import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDate, displayName } from "@/lib/format";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <>
      <Link href={`/blog/${post.slug}`} className="blog-card reveal">
        <div className="blog-card-meta">
          <span className="text-small">{displayName(post.author)}</span>
          <span className="text-small">{formatDate(post.date)}</span>
        </div>
        <h3>{post.title}</h3>
        <p className="blog-card-preview">{post.preview}</p>
        <span className="blog-card-read-more">Read more →</span>
      </Link>
      <style>{`
        .blog-card {
          display: block; text-decoration: none; color: inherit;
          background: var(--color-white); border: 1px solid var(--color-border);
          border-radius: 8px; padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: box-shadow 0.2s;
        }
        .blog-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.14); text-decoration: none; }
        .blog-card-meta {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
        }
        .text-small { font-size: 14px; color: var(--color-gray-text); }
        .blog-card h3 { margin-bottom: 12px; }
        .blog-card-preview { color: var(--color-gray-text); line-height: 1.6; margin-bottom: 0; }
        .blog-card-read-more {
          display: inline-block; margin-top: 16px;
          font-size: 14px; font-weight: 500; color: var(--color-accent);
        }
      `}</style>
    </>
  );
}
