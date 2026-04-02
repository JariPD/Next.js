import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { deletePost } from "@/lib/blog";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;
  const deleted = deletePost(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
