/** @jest-environment node */
import { NextRequest } from "next/server";

jest.mock("@/lib/users", () => ({
  getUserByEmail: jest.fn(),
}));

jest.mock("fs", () => ({
  readFileSync: jest.fn(() => JSON.stringify([])),
  writeFileSync: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => Promise.resolve("hashed-password")),
}));

import { getUserByEmail } from "@/lib/users";
import {POST} from "@/app/api/auth/register/route";

function makeRequest(body: Record<string, string>) {
  return new NextRequest("http://localhost/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("app/api/auth/register — validatie", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getUserByEmail as jest.Mock).mockReturnValue(undefined);
  });

  test("Foutmelding bij ontbrekend e-mailadres", async () => {
    const res = await POST(
      makeRequest({ name: "Test", email: "", password: "secret123" })
    );
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("All fields are required.");
  });

  test("Foutmelding bij ontbrekend wachtwoord", async () => {
    const res = await POST(
      makeRequest({ name: "Test", email: "test@test.com", password: "" })
    );
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("All fields are required.");
  });

  test("Foutmelding als wachtwoord korter is dan 5 karakters", async () => {
    const res = await POST(
      makeRequest({ name: "Test", email: "test@test.com", password: "abc" })
    );
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Password must be at least 5 characters.");
  });

  test("Wachtwoord van exact 5 karakters is geldig", async () => {
    const res = await POST(
      makeRequest({ name: "Test", email: "test@test.com", password: "abcde" })
    );

    expect(res.status).toBe(201);
  });
});
