import { contactLinks } from "@/lib/contact";

export default function ContactLinks() {
  return (
    <div className="contact-info reveal" style={{ minWidth: 220 }}>
      <h3 style={{ marginBottom: 16 }}>Find me on</h3>
      <p style={{ fontSize: 14, color: "var(--color-gray-text)" }}>
        Or reach out directly through the channels below.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
        {contactLinks.map(({ href, label, icon }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span style={{
              width: 36, height: 36, background: "var(--color-light-gray)",
              borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--color-text)", flexShrink: 0,
            }}>
              {icon}
            </span>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
