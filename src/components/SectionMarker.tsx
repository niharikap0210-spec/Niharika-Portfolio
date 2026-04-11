interface SectionMarkerProps {
  label: string;
  letter?: string;
  className?: string;
}

export default function SectionMarker({ label, letter = "A", className = "" }: SectionMarkerProps) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      aria-hidden
    >
      {/* Architectural section circle */}
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "1px solid var(--text-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 8,
            color: "var(--text-muted)",
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
          width: 24,
          height: 0.75,
          backgroundColor: "var(--text-muted)",
          opacity: 0.5,
          flexShrink: 0,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
