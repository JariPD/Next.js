import data from "@/data/users.json";

export type User = {
  id: number;
  email: string;
  password: string;
  role: "user" | "admin";
  name: string;
};

export function getUserByEmail(email: string): User | undefined {
  return (data as User[]).find((u) => u.email === email);
}
