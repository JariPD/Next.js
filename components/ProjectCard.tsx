"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import ProjectModal from "./ProjectModal";

export default function ProjectCard({ project, index, allProjects }: {
  project: Project;
  index: number;
  allProjects: Project[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="reveal"
        style={{
          background: "var(--color-white)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
          transition: "box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.14)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
      >
        <div>
          {/* Color swatch */}
          <div style={{ width: "100%", height: 6, borderRadius: 4, background: project.color, marginBottom: 16 }} />
          <h3 style={{ marginBottom: 8 }}>{project.title}</h3>
          <p style={{ fontSize: 14, color: "var(--color-gray-text)", margin: "8px 0 12px", lineHeight: 1.6 }}>
            {project.shortDescription}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tech.map((t) => (
              <span key={t} style={{
                fontSize: 12, fontWeight: 500, fontFamily: "'Courier New', monospace",
                background: "var(--color-light-gray)", color: "var(--color-primary)",
                border: "1px solid var(--color-border)", padding: "2px 8px", borderRadius: 4,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          style={{
            width: "100%", height: 48, background: "var(--color-accent)", color: "#fff",
            border: "none", borderRadius: 6, fontSize: 16, fontWeight: 500,
            cursor: "pointer", transition: "background-color 0.15s", fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2B6CB0"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-accent)"; }}
        >
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
