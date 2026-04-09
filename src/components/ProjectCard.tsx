import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  index: number;
  accentHue?: string;
}

export default function ProjectCard({
  slug,
  title,
  description,
  tags,
  year,
  index,
  accentHue = "262",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/work/${slug}`}
        className="group block rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 focus-visible:ring-offset-2"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--ink-100)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(124,58,237,0.05)",
          transitionProperty: "box-shadow, transform, border-color",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.06), 0 12px 40px rgba(124,58,237,0.12)";
          el.style.transform = "translateY(-3px)";
          el.style.borderColor = "rgba(124,58,237,0.2)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(124,58,237,0.05)";
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--ink-100)";
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", background: `hsl(${accentHue}, 60%, 96%)` }}
        >
          <img
            src={`https://placehold.co/960x540/EDE9FE/7C3AED?text=`}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              transitionProperty: "transform",
              transitionDuration: "500ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)" }}
          />
          <div
            className="absolute inset-0 mix-blend-multiply opacity-20"
            style={{ background: `hsl(${accentHue}, 80%, 40%)` }}
          />
          <span
            className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "var(--ink-700)", backdropFilter: "blur(4px)" }}
          >
            {year}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-sans font-semibold text-ink-900 text-lg leading-snug" style={{ letterSpacing: "-0.02em" }}>
              {title}
            </h3>
            <span
              className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 text-violet"
              style={{ transitionProperty: "opacity, transform", transitionDuration: "200ms" }}
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <p className="text-sm text-ink-500 mb-4" style={{ lineHeight: "1.65" }}>{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg)", color: "var(--ink-500)", border: "1px solid var(--ink-100)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
