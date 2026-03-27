import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { getUserByEmail } from "@/lib/users";
import type { User } from "@/lib/users";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (getUserByEmail(email)) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }

  const filePath = path.join(process.cwd(), "data/users.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const users: User[] = JSON.parse(raw);

  const hashed = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    email,
    password: hashed,
    role: "user",
    name,
  };

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

  return NextResponse.json({ success: true }, { status: 201 });
}
