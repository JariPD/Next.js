import type { CSSProperties } from "react";

export const container: CSSProperties = {
  maxWidth: "var(--container-width)",
  margin: "0 auto",
  padding: "0 24px",
};

export const section: CSSProperties = { padding: "64px 0" };

export const inputStyle: CSSProperties = {
  height: 44,
  border: "1.5px solid var(--color-border)",
  borderRadius: 6,
  padding: "0 12px",
  fontSize: 16,
  fontFamily: "inherit",
  color: "var(--color-text)",
  background: "var(--color-white)",
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s",
};
