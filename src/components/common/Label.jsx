import { PURPLE, PURPLE_LIGHT } from "../../constants/theme";

export function Label({ children, center = false, light = false }) {
  const c = light ? PURPLE_LIGHT : PURPLE;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, justifyContent: center ? "center" : "flex-start" }}>
      {!center && <span style={{ width: 26, height: 2, background: c, display: "block", borderRadius: 1, flexShrink: 0 }} />}
      <span style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: c, fontWeight: 500 }}>{children}</span>
      {center && <span style={{ width: 26, height: 2, background: c, display: "block", borderRadius: 1, flexShrink: 0 }} />}
    </div>
  );
}
