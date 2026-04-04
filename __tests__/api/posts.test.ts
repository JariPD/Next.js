/** @jest-environment node */
import { NextRequest } from "next/server";

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/blog", () => ({
  getAllPosts: jest.fn(),
  appendPost: jest.fn(),
}));

import { POST } from "@/app/api/blog/posts/route";
import { auth } from "@/auth";
import { getAllPosts, appendPost } from "@/lib/blog";

function makeRequest(body: Record<string, string>) {
  return new NextRequest("http://localhost/api/blog/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("app/api/blog/posts — POST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue({
      user: { email: "auteur@test.com" },
    });
    (getAllPosts as jest.Mock).mockReturnValue([]);
  });

  test("Nieuwe post krijgt status 'pending'", async () => {
    const res = await POST(
      makeRequest({ title: "Mijn Post", content: "Inhoud van de post." })
    );
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.post.status).toBe("pending");
  });

  test("Post bevat correct gegenereerde slug op basis van titel", async () => {
    const res = await POST(
      makeRequest({
        title: "Mijn Eerste Blog Post!",
        content: "Inhoud van de post.",
      })
    );
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.post.slug).toBe("mijn-eerste-blog-post");
  });

  test("Slug bevat geen speciale tekens of hoofdletters", async () => {
    const res = await POST(
      makeRequest({ title: "Hello World & More", content: "Inhoud." })
    );
    const data = await res.json();

    expect(data.post.slug).toMatch(/^[a-z0-9-]+$/);
  });

  test("Geeft 401 terug zonder sessie", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const res = await POST(
      makeRequest({ title: "Test", content: "Inhoud." })
    );

    expect(res.status).toBe(401);
  });

  test("Geeft 400 terug bij ontbrekende titel of inhoud", async () => {
    const res = await POST(makeRequest({ title: "", content: "Inhoud." }));

    expect(res.status).toBe(400);
  });
});
