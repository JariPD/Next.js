import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { getPublishedPosts } from "@/lib/blog";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";
import Button from "@/components/Button";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";
import RevealInit from "@/components/RevealInit";
import ContactLinks from "@/components/ContactLinks";
import { container, section as sec } from "@/lib/styles";

export default function Home() {
  const projects = getAllProjects();
  const publishedPosts = getPublishedPosts();

  return (
    <main>
      <RevealInit />

      {/* ── HERO ── */}
      <section id="hero" style={sec}>
        <div style={container}>
          <div className="hero-inner">
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
              <div className="hero-ctas">
                <Link href="#projects" className="btn-primary">View projects</Link>
                <Link href="#contact" className="btn-secondary">Get in touch</Link>
              </div>
            </div>
            <div className="hero-photo" aria-hidden="true">JD</div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-gray" style={sec}>
        <div style={container}>
          <div className="about-inner">
            <div style={{ flex: 1 }} className="reveal">
              <h2 style={{ marginBottom: 24 }}>About Me</h2>
              <p className="text-gray" style={{ marginBottom: 16 }}>
                Hi! I&apos;m Jari Dijk, a full-stack developer based in The Hague. I study HBO ICT at De Haagse Hogeschool and combine my studies with hands-on experience across a range of projects.
              </p>
              <p className="text-gray" style={{ marginBottom: 16 }}>
                My passion lately has been turning lots of data into comprehensive dashboards and admin panels using Blazor. I also have a strong background in game development with Unity, which has given me a solid foundation in C# and software architecture.
              </p>
              <p className="text-gray">
                Outside of coding I find inspiration in design, enjoy sports, and invest time in game design.
              </p>
            </div>
            <div className="about-stats reveal">
              {[
                { num: "2+",   label: "Years experience" },
                { num: "12+",  label: "Projects completed" },
                { num: "8+",   label: "Technologies" },
                { num: "100+", label: "Bugs squashed" },
              ].map(({ num, label }) => (
                <div key={label} className="stat-box">
                  <div className="stat-number">{num}</div>
                  <div className="stat-lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={sec}>
        <div style={container}>
          <div className="section-heading reveal">
            <h2>Skills</h2>
            <p className="text-gray">Technologies and tools I work with on a daily basis.</p>
          </div>
          <SkillsSection />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-gray" style={sec}>
        <div style={container}>
          <div className="section-heading reveal">
            <h2>Projects</h2>
            <p className="text-gray">A selection of projects I&apos;ve built or contributed to.</p>
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
        <div style={container}>
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
              { type: "work", role: "Junior Full-Stack Developer",  org: "Pubble — Weesp",                       period: "Jan 2025 – present",   desc: "Development of publishing and content management systems using C#, .NET and Blazor." },
              { type: "edu",  role: "HBO ICT — Software Development", org: "De Haagse Hogeschool — The Hague",  period: "Sep 2024 – present",   desc: "Full-time bachelor's programme focused on full-stack web development, software architecture and agile methodologies." },
              { type: "work", role: "Unity Development Intern",     org: "GamePoint — The Hague",               period: "Oct 2023 – Jan 2024",  desc: "Internship as part of my MBO programme. Worked on GamePoint Unity projects covering both front- and back-end." },
              { type: "edu",  role: "MBO 4 — Game Development",     org: "Grafisch Lyceum Utrecht — Utrecht",   period: "Sep 2021 – Jul 2024",  desc: "Level 4 vocational programme focused on game development, scrum and design." },
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
      <section id="blog" className="section-gray" style={sec}>
        <div style={container}>
          <div className="section-heading reveal" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2>Blog</h2>
              <p className="text-gray">Technical articles and insights from my day-to-day work as a developer.</p>
            </div>
            <Button variant="secondary" href="/blog/new">Write a post</Button>
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
        <div style={container}>
          <div className="contact-inner">
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
    </main>
  );
}
