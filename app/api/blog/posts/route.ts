import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createPost } from "@/lib/blog";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { title, content } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const post = await createPost({ userEmail: session.user.email, title, slug, content });

  return NextResponse.json({ success: true, post }, { status: 201 });
}
