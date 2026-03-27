const skills = {
  Frontend: ["Blazor", "MudBlazor", "ApexCharts", "Leaflet", "HTML/CSS", "Tailwind"],
  Backend: ["C#", ".Net", "MongoDB", "REST API"],
  "Tools & DevOps": ["Docker", "Git", "GitHub Pages", "Netlify", "Figma"],
};

export default function SkillsSection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="skills-grid">
      {Object.entries(skills).map(([category, items]) => (
        <div
          key={category}
          className="reveal"
          style={{
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ marginBottom: 8, fontSize: 16 }}>{category}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {items.map((skill) => (
              <span key={skill} style={{
                fontSize: 12, fontWeight: 500, fontFamily: "'Courier New', monospace",
                background: "var(--color-light-gray)", color: "var(--color-primary)",
                border: "1px solid var(--color-border)", padding: "2px 8px", borderRadius: 4,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      <style>{`
        @media (max-width: 1024px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
