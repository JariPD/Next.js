/** @jest-environment node */
import fs from "fs";
import { getPublishedPosts } from "@/lib/blog";

jest.mock("fs");

const mockPosts = [
  {
    id: 1,
    title: "Published Post",
    slug: "published-post",
    author: "a@b.com",
    date: "2024-01-01",
    status: "published",
    preview: "",
    content: "",
  },
  {
    id: 2,
    title: "Pending Post",
    slug: "pending-post",
    author: "a@b.com",
    date: "2024-01-02",
    status: "pending",
    preview: "",
    content: "",
  },
  {
    id: 3,
    title: "Rejected Post",
    slug: "rejected-post",
    author: "a@b.com",
    date: "2024-01-03",
    status: "rejected",
    preview: "",
    content: "",
  },
  {
    id: 4,
    title: "Another Published Post",
    slug: "another-published-post",
    author: "b@b.com",
    date: "2024-01-04",
    status: "published",
    preview: "",
    content: "",
  },
];

describe("getPublishedPosts()", () => {
  beforeEach(() => {
    jest.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(mockPosts));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Geeft alleen posts terug met status 'published'", () => {
    const result = getPublishedPosts();

    expect(result.every((p) => p.status === "published")).toBe(true);
  });

  test("Geeft geen pending of rejected posts terug", () => {
    const result = getPublishedPosts();

    expect(result.some((p) => p.status === "pending")).toBe(false);
    expect(result.some((p) => p.status === "rejected")).toBe(false);
  });

  test("Geeft het juiste aantal gepubliceerde posts terug", () => {
    const result = getPublishedPosts();

    expect(result).toHaveLength(2);
  });

  test("Geeft lege array terug als er geen gepubliceerde posts zijn", () => {
    jest.spyOn(fs, "readFileSync").mockReturnValue(
      JSON.stringify([mockPosts[1], mockPosts[2]])
    );

    const result = getPublishedPosts();

    expect(result).toHaveLength(0);
  });
});
