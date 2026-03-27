import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // In production, send an email here.
  return NextResponse.json({ success: true });
}
