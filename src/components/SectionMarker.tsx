interface SectionMarkerProps {
  label: string;
  letter?: string;
  className?: string;
}

export default function SectionMarker({ label, letter = "A", className = "" }: SectionMarkerProps) {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      aria-hidden
    >
      {/* Architectural section circle */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            color: "var(--accent)",
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          {letter}
        </span>
      </div>

      {/* Line extending right */}
      <div
        style={{
          width: 36,
          height: 1,
          backgroundColor: "var(--text-muted)",
          opacity: 0.5,
          flexShrink: 0,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 13,
          color: "var(--text-secondary)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
