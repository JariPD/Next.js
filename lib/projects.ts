import data from "@/data/projects.json";

export type Project = {
  id: number;
  title: string;
  shortDescription: string;
  tech: string[];
  problem: string;
  approach: string;
  role: string;
  color: string;
  demoUrl: string | null;
  githubUrl: string;
  year: number;
  month: number;
  featured: boolean;
};

const projects = data as Project[];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}
