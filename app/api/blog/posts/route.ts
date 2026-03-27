import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { appendPost, getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { title, content } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const posts = getAllPosts();
  const maxId = posts.reduce((max, p) => Math.max(max, p.id), 0);

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const newPost: BlogPost = {
    id: maxId + 1,
    title,
    slug,
    author: session.user.email,
    date: new Date().toISOString().split("T")[0],
    status: "pending",
    preview: content.slice(0, 200),
    content,
  };

  appendPost(newPost);

  return NextResponse.json({ success: true, post: newPost }, { status: 201 });
}
