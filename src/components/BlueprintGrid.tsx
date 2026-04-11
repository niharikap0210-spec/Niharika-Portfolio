interface BlueprintGridProps {
  subtle?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function BlueprintGrid({
  subtle = false,
  className = "",
  children,
  style,
}: BlueprintGridProps) {
  return (
    <div
      className={`${subtle ? "blueprint-grid-subtle" : "blueprint-grid"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
