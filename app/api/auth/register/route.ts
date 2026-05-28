import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/lib/users";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (password.length < 5) {
    return NextResponse.json({ error: "Password must be at least 5 characters." }, { status: 400 });
  }

  if (await getUserByEmail(email)) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  await createUser({ name, email, password: hashed });

  return NextResponse.json({ success: true }, { status: 201 });
}
