"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { formatProjectDate } from "@/lib/format";
import ProjectModal from "./ProjectModal";

/* Project preview card — styles live in globals.css (.card, .tag, .btn-primary) */
export default function ProjectCard({ project, index, allProjects }: {
  project: Project;
  index: number;
  allProjects: Project[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card reveal" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16, transition: "box-shadow 0.2s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.14)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
      >
        <div>
          {/* Color accent strip matching prototype */}
          <div style={{ width: "100%", height: 6, borderRadius: 4, background: project.color, marginBottom: 16 }} />
          <h3 style={{ marginBottom: 8 }}>{project.title}</h3>
          <p style={{ fontSize: 14, color: "var(--color-gray-text)", margin: "8px 0 8px", lineHeight: 1.6 }}>
            {project.shortDescription}
          </p>
          <p style={{ fontSize: 13, color: "var(--color-gray-text)", marginBottom: 12 }}>
            {formatProjectDate(project.year, project.month)}
          </p>
          <div className="tag-list">
            {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
        <button onClick={() => setOpen(true)} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          View details
        </button>
      </div>

      {open && (
        <ProjectModal
          project={project}
          allProjects={allProjects}
          initialIndex={index}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
