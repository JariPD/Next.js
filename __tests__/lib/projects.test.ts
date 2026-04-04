/** @jest-environment node */
import { getAllProjects } from "@/lib/projects";
import projectsData from "@/data/projects.json";

describe("getAllProjects()", () => {
  test("Geeft alle projecten terug uit projects.json", () => {
    const result = getAllProjects();

    expect(result).toHaveLength(projectsData.length);
  });

  test("Geeft een array van projecten terug", () => {
    const result = getAllProjects();

    expect(Array.isArray(result)).toBe(true);
  });

  test("Elk project bevat de verwachte velden", () => {
    const result = getAllProjects();

    result.forEach((project) => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("shortDescription");
      expect(project).toHaveProperty("tech");
      expect(project).toHaveProperty("year");
    });
  });

  test("Geeft referentie naar dezelfde data als projects.json", () => {
    const result = getAllProjects();

    expect(result[0].title).toBe(projectsData[0].title);
    expect(result[result.length - 1].id).toBe(
      projectsData[projectsData.length - 1].id
    );
  });
});
