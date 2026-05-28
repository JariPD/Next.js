import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { user_id: id } });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const result = await prisma.blogPost.deleteMany({ where: { user_id: id } });

  return NextResponse.json({ success: true, deleted: result.count });
}
