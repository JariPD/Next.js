import { getAllProjects } from "@/lib/projects";
import { getPublishedPosts } from "@/lib/blog";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";
import RevealInit from "@/components/RevealInit";
import ContactLinks from "@/components/ContactLinks";

const c: React.CSSProperties = { maxWidth: "var(--container-width)", margin: "0 auto", padding: "0 24px" };
const sec: React.CSSProperties = { padding: "64px 0" };
const secGray: React.CSSProperties = { ...sec, background: "var(--color-light-gray)" };

export default function Home() {
  const projects = getAllProjects();
  const publishedPosts = getPublishedPosts();

  return (
    <main>
      <RevealInit />

      {/* ── HERO ── */}
      <section id="hero" style={sec}>
        <div style={c}>
          <div className="hero-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 64 }}>
            <div style={{ flex: 1, maxWidth: 560 }}>
              <p style={{ fontSize: 14, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-accent)", marginBottom: 8 }}>
                Full-Stack Developer
              </p>
              <h1 style={{ marginBottom: 16 }}>Jari Dijk</h1>
              <p style={{ fontSize: 18, color: "var(--color-gray-text)", marginBottom: 24, lineHeight: 1.5 }}>
                I build modern web applications, dashboards and interactive experiences with Blazor, .NET and Unity. My focus is on writing scalable, maintainable code and crafting intuitive user interfaces.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {["Blazor", ".Net", "Unity", "Git", "Agile/Scrum"].map((tag) => (
                  <span key={tag} className="hero-skill-tag">{tag}</span>
                ))}
              </div>
              <div className="hero-ctas" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#projects" className="btn-primary">View projects</a>
                <a href="#contact" className="btn-secondary">Get in touch</a>
              </div>
            </div>
            <div className="hero-photo" aria-hidden="true">JD</div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={secGray}>
        <div style={c}>
          <div className="about-inner" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }} className="reveal">
              <h2 style={{ marginBottom: 24 }}>About Me</h2>
              <p className="text-gray" style={{ marginBottom: 16 }}>
                Hi! I'm Jari Dijk, a full-stack developer based in The Hague. I study HBO ICT at De Haagse Hogeschool and combine my studies with hands-on experience across a range of projects.
              </p>
              <p className="text-gray" style={{ marginBottom: 16 }}>
                My passion lately has been turning lots of data into comprehensive dashboards and admin panels using Blazor. I also have a strong background in game development with Unity, which has given me a solid foundation in C# and software architecture.
              </p>
              <p className="text-gray">
                Outside of coding I find inspiration in design, enjoy sports, and invest time in game design.
              </p>
            </div>
            <div className="about-stats reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, minWidth: 280 }}>
              {[
                { num: "2+", label: "Years experience" },
                { num: "12+", label: "Projects completed" },
                { num: "8+", label: "Technologies" },
                { num: "100+", label: "Bugs squashed" },
              ].map(({ num, label }) => (
                <div key={label} className="stat-box">
                  <div className="stat-number">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={sec}>
        <div style={c}>
          <div className="section-heading reveal">
            <h2>Skills</h2>
            <p className="text-gray">Technologies and tools I work with on a daily basis.</p>
          </div>
          <SkillsSection />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={secGray}>
        <div style={c}>
          <div className="section-heading reveal">
            <h2>Projects</h2>
            <p className="text-gray">A selection of projects I've built or contributed to.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} allProjects={projects} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={sec}>
        <div style={c}>
          <div className="section-heading reveal">
            <h2>Experience &amp; Education</h2>
            <p className="text-gray">My professional and academic background.</p>
          </div>

          <div className="timeline-legend reveal">
            <span className="timeline-type timeline-type-work">Work</span>
            <span className="timeline-type timeline-type-edu">Education</span>
          </div>

          <div className="timeline">
            {[
              { type: "work", role: "Junior Full-Stack Developer", org: "Pubble — Weesp", period: "Jan 2025 – present", desc: "Development of publishing and content management systems using C#, .NET and Blazor." },
              { type: "edu", role: "HBO ICT — Software Development", org: "De Haagse Hogeschool — The Hague", period: "Sep 2024 – present", desc: "Full-time bachelor's programme focused on full-stack web development, software architecture and agile methodologies." },
              { type: "work", role: "Unity Development Intern", org: "GamePoint — The Hague", period: "Oct 2023 – Jan 2024", desc: "Internship as part of my MBO programme. Worked on GamePoint Unity projects covering both front- and back-end." },
              { type: "edu", role: "MBO 4 — Game Development", org: "Grafisch Lyceum Utrecht — Utrecht", period: "Sep 2021 – Jul 2024", desc: "Level 4 vocational programme focused on game development, scrum and design." },
            ].map((item, idx) => (
              <div key={idx} className="timeline-item reveal">
                <div className={`timeline-dot${item.type === "edu" ? " dot-edu" : ""}`} />
                <div className="timeline-card">
                  <span className={`timeline-type timeline-type-${item.type === "edu" ? "edu" : "work"}`}>
                    {item.type === "edu" ? "Education" : "Work"}
                  </span>
                  <div className="timeline-header">
                    <div>
                      <div className="timeline-role">{item.role}</div>
                      <div className="timeline-company">{item.org}</div>
                    </div>
                    <span className="timeline-period">{item.period}</span>
                  </div>
                  <p className="text-gray-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" style={secGray}>
        <div style={c}>
          <div className="section-heading reveal">
            <h2>Blog</h2>
            <p className="text-gray">Technical articles and insights from my day-to-day work as a developer.</p>
          </div>
          {publishedPosts.length > 0 ? (
            <div className="blog-grid">
              {publishedPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray">No posts yet.</p>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={sec}>
        <div style={c}>
          <div className="contact-inner" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
            <div className="contact-form-wrap">
              <div className="section-heading reveal">
                <h2>Contact</h2>
                <p className="text-gray">Have a question? Send me a message.</p>
              </div>
              <ContactForm />
            </div>
            <ContactLinks />
          </div>
        </div>
      </section>

      <style>{`
        /* ── Typography helpers ── */
        .text-gray { color: var(--color-gray-text); line-height: 1.7; }
        .text-gray-sm { color: var(--color-gray-text); font-size: 15px; }

        /* ── Hero ── */
        .hero-skill-tag {
          font-size: 13px; font-weight: 500; font-family: 'Courier New', monospace;
          background: rgba(49,130,206,0.08); color: var(--color-accent);
          border: 1px solid rgba(49,130,206,0.2); padding: 4px 10px; border-radius: 4px;
        }
        .hero-photo {
          width: 280px; height: 280px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 80px; font-weight: 700; color: rgba(255,255,255,0.9); letter-spacing: -2px;
          box-shadow: 0 8px 32px rgba(49,130,206,0.25);
        }

        /* ── Buttons ── */
        .btn-primary {
          background-color: var(--color-accent); color: var(--color-white);
          height: 48px; padding: 0 24px; border: none; border-radius: 6px;
          font-size: 16px; font-weight: 500; cursor: pointer;
          transition: background-color 0.15s; font-family: inherit;
          text-decoration: none; display: inline-flex; align-items: center;
        }
        .btn-primary:hover { background-color: #2B6CB0; text-decoration: none; }
        .btn-secondary {
          background-color: transparent; color: var(--color-accent);
          height: 48px; padding: 0 20px; border: 1.5px solid var(--color-accent);
          border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer;
          transition: background-color 0.15s, color 0.15s; font-family: inherit;
          text-decoration: none; display: inline-flex; align-items: center;
        }
        .btn-secondary:hover { background-color: var(--color-accent); color: var(--color-white); text-decoration: none; }

        /* ── About stats ── */
        .stat-box {
          background: var(--color-white); border: 1px solid var(--color-border);
          border-radius: 8px; padding: 24px; text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .stat-number { font-size: 36px; font-weight: 700; color: var(--color-accent); line-height: 1; }
        .stat-label { font-size: 13px; color: var(--color-gray-text); margin-top: 4px; }

        /* ── Section headings ── */
        .section-heading { margin-bottom: 32px; }
        .section-heading h2 { margin-bottom: 8px; }

        /* ── Projects grid ── */
        .projects-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 32px;
        }

        /* ── Timeline ── */
        .timeline {
          position: relative; max-width: 800px; margin: 0 auto;
          padding-left: 48px;
        }
        .timeline::before {
          content: ''; position: absolute; left: 16px; top: 0; bottom: 0;
          width: 2px; background: var(--color-border);
        }
        .timeline-item { position: relative; margin-bottom: 32px; }
        .timeline-item:last-child { margin-bottom: 0; }
        .timeline-dot {
          position: absolute; left: -38px; top: 6px;
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--color-accent); border: 3px solid var(--color-white);
          box-shadow: 0 0 0 2px var(--color-accent);
        }
        .timeline-dot.dot-edu {
          background: var(--color-success);
          box-shadow: 0 0 0 2px var(--color-success);
        }
        .timeline-card {
          background: var(--color-white); border: 1px solid var(--color-border);
          border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .timeline-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 16px; margin-bottom: 4px;
        }
        .timeline-role { font-size: 18px; font-weight: 600; color: var(--color-text); }
        .timeline-company { font-size: 14px; font-weight: 500; color: var(--color-accent); margin-bottom: 8px; }
        .timeline-period { font-size: 13px; color: var(--color-gray-text); white-space: nowrap; }
        .timeline-type {
          display: inline-block; font-size: 11px; font-weight: 600;
          padding: 2px 10px; border-radius: 12px; text-transform: uppercase;
          letter-spacing: 0.05em; margin-bottom: 8px;
        }
        .timeline-type-work { background: rgba(49,130,206,0.10); color: var(--color-accent); }
        .timeline-type-edu  { background: rgba(56,161,105,0.10); color: var(--color-success); }
        .timeline-legend {
          display: flex; gap: 16px; max-width: 800px;
          margin: 0 auto 24px; padding-left: 48px;
        }

        /* ── Blog grid ── */
        .blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 32px; }

        /* ── Contact ── */
        .contact-form-wrap { flex: 1; max-width: 600px; }

        /* ── Reveal animations ── */
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-photo { width: 220px !important; height: 220px !important; font-size: 64px !important; }
        }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column-reverse !important; gap: 32px !important; text-align: center; }
          .hero-ctas { justify-content: center; }
          .hero-photo { width: 160px !important; height: 160px !important; font-size: 48px !important; }
          .about-inner { flex-direction: column !important; }
          .about-stats { min-width: 0 !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
          .contact-inner { flex-direction: column !important; }
          .contact-form-wrap { max-width: 100% !important; }
        }
        @media (max-width: 480px) {
          .hero-ctas a { width: 100%; max-width: 280px; text-align: center; display: flex; justify-content: center; }
        }
      `}</style>
    </main>
  );
}
