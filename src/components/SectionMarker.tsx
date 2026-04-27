interface SectionMarkerProps {
  label: string;
  letter?: string;
  className?: string;
  accentColor?: string;
  total?: number;
}

export default function SectionMarker({
  label,
  letter = "A",
  className = "",
  accentColor = "var(--accent)",
  total = 8,
}: SectionMarkerProps) {
  const index = Math.max(1, letter.toUpperCase().charCodeAt(0) - 64);
  const counter = String(index).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <div
      className={className}
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        height: 36,
        position: "relative",
      }}
    >
      {/* Reference bubble — boxed letter like architectural drawing callouts */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          border: `1px solid ${accentColor}`,
          flexShrink: 0,
          position: "relative",
          backgroundColor: "transparent",
        }}
      >
        {/* Corner ticks */}
        <span style={{ position: "absolute", top: 3, left: 3, width: 5, height: 5, borderTop: `1px solid ${accentColor}`, borderLeft: `1px solid ${accentColor}` }} />
        <span style={{ position: "absolute", top: 3, right: 3, width: 5, height: 5, borderTop: `1px solid ${accentColor}`, borderRight: `1px solid ${accentColor}` }} />
        <span style={{ position: "absolute", bottom: 3, left: 3, width: 5, height: 5, borderBottom: `1px solid ${accentColor}`, borderLeft: `1px solid ${accentColor}` }} />
        <span style={{ position: "absolute", bottom: 3, right: 3, width: 5, height: 5, borderBottom: `1px solid ${accentColor}`, borderRight: `1px solid ${accentColor}` }} />
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 17,
            color: accentColor,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {letter}
        </span>
      </div>

      {/* Leader tick out of the box */}
      <div style={{ width: 14, height: 1, backgroundColor: accentColor, opacity: 0.5, flexShrink: 0 }} />

      {/* Label */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: "var(--text-primary)",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          fontWeight: 600,
          whiteSpace: "nowrap",
          paddingRight: 20,
        }}
      >
        {label}
      </span>

      {/* Dashed rule filling available space */}
      <div
        style={{
          flex: 1,
          height: 0,
          borderTop: "1px dashed var(--border)",
          minWidth: 24,
        }}
      />

      {/* Right: section reference tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          flexShrink: 0,
          marginLeft: 20,
          height: 26,
          border: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "var(--text-muted)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: "0 10px",
            borderRight: "1px solid var(--border)",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          Section
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            fontWeight: 600,
            padding: "0 10px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ color: accentColor }}>{counter}</span>
          <span style={{ color: "var(--border)", margin: "0 2px" }}>/</span>
          <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>{totalStr}</span>
        </span>
      </div>
    </div>
  );
}
