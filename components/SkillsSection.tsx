/* Skills data organized by category, matching the prototype */
const skills: Record<string, string[]> = {
  Frontend:       ["Blazor", "MudBlazor", "ApexCharts", "Leaflet", "HTML/CSS", "Tailwind"],
  Backend:        ["C#", ".Net", "MongoDB", "REST API"],
  "Tools & DevOps": ["Docker", "Git", "GitHub Pages", "Netlify", "Figma"],
};

export default function SkillsSection() {
  return (
    <div className="skills-grid">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="card reveal">
          <h3 style={{ marginBottom: 8, fontSize: 16 }}>{category}</h3>
          <div className="tag-list" style={{ marginTop: 12 }}>
            {items.map((skill) => (
              <span key={skill} className="tag">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
