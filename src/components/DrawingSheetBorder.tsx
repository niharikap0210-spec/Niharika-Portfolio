interface TitleBlockData {
  name?: string;
  title?: string;
  sheet?: string;
  scale?: string;
  date?: string;
  project?: string;
  role?: string;
  duration?: string;
}

interface DrawingSheetBorderProps {
  titleBlock?: TitleBlockData;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function DrawingSheetBorder({
  titleBlock,
  children,
  className = "",
  style,
}: DrawingSheetBorderProps) {
  return (
    <div className={`relative ${className}`} style={style}>
      {/* Inset border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 10,
          border: "0.75px solid var(--construction)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Title block — bottom right */}
      {titleBlock && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            border: "0.75px solid var(--construction)",
            padding: "6px 10px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {titleBlock.project && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.6 }}>
              PROJECT: {titleBlock.project}
            </p>
          )}
          {titleBlock.name && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.6 }}>
              {titleBlock.name}
            </p>
          )}
          {titleBlock.title && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, opacity: 0.7 }}>
              {titleBlock.title}
            </p>
          )}
          {titleBlock.role && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, opacity: 0.7 }}>
              ROLE: {titleBlock.role}
            </p>
          )}
          {titleBlock.duration && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, opacity: 0.7 }}>
              DURATION: {titleBlock.duration}
            </p>
          )}
          {titleBlock.scale && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, opacity: 0.7 }}>
              {titleBlock.scale}
            </p>
          )}
          {titleBlock.sheet && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, opacity: 0.7 }}>
              SHEET: {titleBlock.sheet}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
