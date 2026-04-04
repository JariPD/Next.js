import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { deletePost, getPostById } from "@/lib/blog";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const post = getPostById(Number(id));
  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  const isAdmin = session.user.role === "admin";
  const isOwner = post.author === session.user.email;
  if (!isAdmin && !isOwner) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  deletePost(Number(id));
  return NextResponse.json({ success: true });
}
