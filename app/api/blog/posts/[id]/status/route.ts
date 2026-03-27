import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updatePostStatus } from "@/lib/blog";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!["published", "pending", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const updated = updatePostStatus(Number(id), status);
  if (!updated) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
