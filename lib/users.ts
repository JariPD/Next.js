import fs from "fs";
import path from "path";

export type User = {
  id: number;
  email: string;
  password: string;
  role: "user" | "admin";
  name: string;
};

function readUsers(): User[] {
  const filePath = path.join(process.cwd(), "data/users.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as User[];
}

export function getUserByEmail(email: string): User | undefined {
  return readUsers().find((u) => u.email === email);
}

export function displayName(email: string): string {
  const user = getUserByEmail(email);
  return user?.name ?? email.split("@")[0];
}
