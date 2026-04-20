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
        justifyContent: "space-between",
        gap: 24,
        paddingBottom: 14,
        borderBottom: "0.75px solid var(--border)",
      }}
    >
      {/* Left cluster: accent bar + letter + label */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
        <span
          style={{
            width: 3,
            height: 26,
            backgroundColor: accentColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 22,
            color: accentColor,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            flexShrink: 0,
          }}
        >
          {letter}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: "var(--text-primary)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </span>
      </div>

      {/* Right cluster: section counter */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "var(--text-secondary)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Section
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: accentColor,
            letterSpacing: "0.14em",
            fontWeight: 600,
          }}
        >
          {counter}
          <span style={{ color: "var(--text-secondary)", margin: "0 4px" }}>/</span>
          <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>{totalStr}</span>
        </span>
      </div>
    </div>
  );
}
