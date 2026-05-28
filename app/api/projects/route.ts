import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllProjects, createProject } from "@/lib/projects";

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json();
  const { title, description } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  const project = await createProject(body);
  return NextResponse.json({ success: true, project }, { status: 201 });
}
