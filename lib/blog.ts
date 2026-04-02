import fs from "fs";
import path from "path";

export type Status = "published" | "pending" | "rejected";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  status: Status;
  preview: string;
  content: string;
};

function readPosts(): BlogPost[] {
  const filePath = path.join(process.cwd(), "data/blog.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as BlogPost[];
}

function writePosts(posts: BlogPost[]): void {
  const filePath = path.join(process.cwd(), "data/blog.json");
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf-8");
}

export function getAllPosts(): BlogPost[] {
  return readPosts();
}

export function getPublishedPosts(): BlogPost[] {
  return readPosts().filter((p) => p.status === "published");
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return readPosts().find((p) => p.slug === slug);
}

export function getPostsByAuthor(email: string): BlogPost[] {
  return readPosts().filter((p) => p.author === email);
}

export function appendPost(post: BlogPost): void {
  const posts = readPosts();
  posts.push(post);
  writePosts(posts);
}

export function updatePostStatus(id: number, status: Status): boolean {
  const posts = readPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts[index].status = status;
  writePosts(posts);
  return true;
}

export function deletePost(id: number): boolean {
  const posts = readPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  writePosts(filtered);
  return true;
}
