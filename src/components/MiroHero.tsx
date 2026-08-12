import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Cursor as HeroCursor, CursorFollow, CursorProvider } from "@/components/ui/cursor";
import {
  CursorIcon as Cursor,
  TextTIcon as TextT,
  NoteBlankIcon as NoteBlank,
  ShapesIcon as Shapes,
  ArrowUpRightIcon as ArrowUpRight,
  PenNibIcon as PenNib,
  PlusIcon as Plus,
  MinusIcon as Minus,
  TrashIcon as Trash,
  ArrowUUpLeftIcon as ArrowUUpLeft,
  ArrowUUpRightIcon as ArrowUUpRight,
  SquareIcon as Square,
  CircleIcon as Circle,
  ListIcon as List,
  ExportIcon as Export,
  MagnifyingGlassIcon as MagnifyingGlass,
  CaretDownIcon as CaretDown,
  UserPlusIcon as UserPlus,
  SidebarSimpleIcon as SidebarSimple,
  QuestionIcon as Question,
  SparkleIcon as Sparkle,
  HandWavingIcon as HandWaving,
} from "@phosphor-icons/react";

gsap.registerPlugin(TextPlugin, DrawSVGPlugin);

/* ══════════════════════════════════════════════════════════════════
   COPY  —  swap these to change all hero text in one place
   ══════════════════════════════════════════════════════════════════ */
const COPY = {
  boardName: "Niharika Pundlik · Product Design",
  eyebrow: "Hello, my name is",
  heading: "Niharika Pundlik",
  subheading:
    "I'm a Product Designer who goes end-to-end, from research and systems thinking to the final pixel, with an architect's eye for structure.",
};
const [NAME_FIRST, ...NAME_REST] = COPY.heading.split(" ");
const NAME_LAST = NAME_REST.join(" ");

/* ─── Palettes (tuned to the Miro reference) ────────────────────── */
const STICKY: Record<string, string> = {
  yellow: "#FCE34E", blue: "#9EC5F6", pink: "#F6A9D0", green: "#B7E49B", purple: "#C8B4EF",
};
const PALETTE = ["yellow", "blue", "pink", "green", "purple"];
const MIRO_BLUE = "#4262FF";
const PEN_INK = "#1A1A2E";
const INK = "#1A1A2E";
/* One typeface everywhere + a livelier accent (replaces the muted gold) */
const FONT = "'Manrope', system-ui, sans-serif";
const ACCENT = "#8A8078";                        // muted warm-grey — the little nametag label
const HIGHLIGHT = "rgba(66, 98, 255, 0.26)";     // soft light-blue marker highlight (brand blue, lightened)

/* ─── Types ─────────────────────────────────────────────────────── */
type Tool = "select" | "text" | "sticky" | "shape" | "connector" | "pen";
type ShapeKind = "rect" | "ellipse";
type Pt = { x: number; y: number };

type StickyEl = { id: string; kind: "sticky"; x: number; y: number; w: number; h: number; text: string; color: string };
type TextEl   = { id: string; kind: "text";   x: number; y: number; text: string; fontSize?: number };
type ShapeEl  = { id: string; kind: "shape";  x: number; y: number; w: number; h: number; shape: ShapeKind; color: string; text: string };
type DrawEl   = { id: string; kind: "draw";   x: number; y: number; points: Pt[]; color: string; variant: "pen" | "arrow" };
type El = StickyEl | TextEl | ShapeEl | DrawEl;

let _idc = 0;
const uid = () => `el_${++_idc}`;

/* ─── Toolbar tools ─────────────────────────────────────────────── */
const TOOLS: { id: Tool; label: string; key: string; Icon: React.ElementType }[] = [
  { id: "select",    label: "Select",     key: "V", Icon: Cursor },
  { id: "text",      label: "Text",       key: "T", Icon: TextT },
  { id: "sticky",    label: "Sticky note",key: "S", Icon: NoteBlank },
  { id: "shape",     label: "Shape",      key: "R", Icon: Shapes },
  { id: "connector", label: "Connector",  key: "C", Icon: ArrowUpRight },
  { id: "pen",       label: "Pen",        key: "P", Icon: PenNib },
];

/* ─── Floating collaborator cursors (the "floating arrows") ─────── */
const COLLABS = [
  { name: "Devon",  color: "green",  left: "11%", top: "14%", loop: { x: [0, 24, -14, 0], y: [0, -16, 12, 0] }, dur: 21 },
  { name: "Marcus", color: "blue",   left: "8%",  top: "82%", loop: { x: [0, -20, 18, 0], y: [0, 14, -14, 0] }, dur: 19 },
  { name: "Priya",  color: "pink",   left: "82%", top: "20%", loop: { x: [0, 26, -16, 0], y: [0, -18, 12, 0] }, dur: 16 },
  { name: "Aria",   color: "yellow", left: "87%", top: "66%", loop: { x: [0, -18, 22, 0], y: [0, 18, -12, 0] }, dur: 17 },
];

/* ─── Draw helpers ──────────────────────────────────────────────── */
function toPath(pts: Pt[]): string {
  if (pts.length === 0) return "";
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}
function bbox(pts: Pt[]) {
  const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
  return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
}
function arrowHead(a: Pt, b: Pt, size = 11): string {
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const l = { x: b.x - size * Math.cos(ang - 0.45), y: b.y - size * Math.sin(ang - 0.45) };
  const r = { x: b.x - size * Math.cos(ang + 0.45), y: b.y - size * Math.sin(ang + 0.45) };
  return `M ${l.x.toFixed(1)} ${l.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)} L ${r.x.toFixed(1)} ${r.y.toFixed(1)}`;
}

/* ─── Editable text primitive (uncontrolled, caret-safe) ────────── */
function EditableText({
  value, editing, onInput, onBlur, onKeyDown, style, placeholder,
}: {
  value: string; editing: boolean; onInput: (v: string) => void; onBlur: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void; style?: React.CSSProperties; placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.textContent !== value) el.textContent = value;
  }, [value]);
  useEffect(() => {
    if (editing && ref.current) {
      const el = ref.current; el.focus();
      const range = document.createRange(); range.selectNodeContents(el); range.collapse(false);
      const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(range);
    }
  }, [editing]);
  return (
    <div
      ref={ref} className="miro-editable" contentEditable={editing} suppressContentEditableWarning
      data-placeholder={placeholder}
      onInput={(e) => onInput((e.currentTarget as HTMLDivElement).textContent || "")}
      onBlur={onBlur} onKeyDown={onKeyDown}
      style={{ outline: "none", whiteSpace: "pre-wrap", cursor: editing ? "text" : "inherit", ...style }}
    />
  );
}

/* ─── Corner selection handles ──────────────────────────────────── */
function Handles() {
  const pos: React.CSSProperties[] = [
    { top: -5, left: -5 }, { top: -5, right: -5 }, { bottom: -5, right: -5 }, { bottom: -5, left: -5 },
  ];
  return <>{pos.map((p, i) => (
    <div key={i} style={{
      position: "absolute", width: 9, height: 9, borderRadius: 2, background: "#fff",
      border: `1.5px solid ${MIRO_BLUE}`, boxShadow: "0 1px 2px rgba(9,30,66,0.2)", pointerEvents: "none", zIndex: 3, ...p,
    }} />
  ))}</>;
}

/* ─── Element context toolbar (recolor / delete) ────────────────── */
function ContextBar({ colors, onColor, onDelete }: { colors: boolean; onColor: (c: string) => void; onDelete: () => void }) {
  return (
    <div onPointerDown={(e) => e.stopPropagation()} style={{
      position: "absolute", top: -46, left: 0, display: "flex", alignItems: "center", gap: 8,
      padding: "6px 8px", background: "#fff", borderRadius: 10, boxShadow: "var(--miro-shadow-lg)",
      border: "1px solid rgba(9,30,66,0.06)", zIndex: 5,
    }}>
      {colors && (<>
        <div style={{ display: "flex", gap: 5 }}>
          {PALETTE.map((c) => (
            <button key={c} aria-label={`Colour ${c}`} onClick={() => onColor(c)} className="miro-tool-btn"
              style={{ width: 18, height: 18, borderRadius: "50%", background: STICKY[c], border: "1px solid rgba(9,30,66,0.12)", cursor: "pointer", padding: 0 }} />
          ))}
        </div>
        <span style={{ width: 1, height: 18, background: "rgba(9,30,66,0.10)" }} />
      </>)}
      <button aria-label="Delete" onClick={onDelete} className="miro-tool-btn"
        style={{ display: "grid", placeItems: "center", width: 26, height: 26, borderRadius: 7, border: "none", background: "transparent", color: "#E0455E", cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(224,69,94,0.10)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <Trash size={17} weight="regular" />
      </button>
    </div>
  );
}

/* ─── Floating collaborator cursor (plain div; GSAP drives drift) ─ */
function CollabCursor({ name, color, left, top }: { name: string; color: string; left: string; top: string }) {
  const c = STICKY[color];
  return (
    <div aria-hidden className="collab-cursor hidden lg:block absolute" style={{ left, top, pointerEvents: "none", zIndex: 4, willChange: "transform" }}>
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" style={{ filter: "drop-shadow(0 2px 3px rgba(9,30,66,0.25))" }}>
        <path d="M3 2 L3 18 L7.4 14 L11 22 L13.8 20.8 L10.2 13 L16 13 Z" fill={c} stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
      <span style={{ position: "absolute", top: 17, left: 15, whiteSpace: "nowrap", fontFamily: FONT, fontSize: 12, fontWeight: 700, color: INK, background: c, padding: "3px 10px", borderRadius: 12, boxShadow: "0 2px 6px rgba(9,30,66,0.18)" }}>{name}</span>
    </div>
  );
}

/* ═══════════════════════════ Main ═══════════════════════════════ */
export default function MiroHero() {
  const rootRef = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  const [tool, setTool] = useState<Tool>("select");
  const [shapeKind, setShapeKind] = useState<ShapeKind>("rect");
  const [newColor, setNewColor] = useState("yellow");
  const [zoom, setZoom] = useState(1);

  const [elements, setElements] = useState<El[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drawing, setDrawing] = useState<Pt[] | null>(null);

  const elementsRef = useRef<El[]>([]);
  const historyRef = useRef<El[][]>([]);
  const redoRef = useRef<El[][]>([]);
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const drawStartRef = useRef<Pt>({ x: 0, y: 0 });

  useEffect(() => { elementsRef.current = elements; }, [elements]);

  /* ── GSAP: entrance timeline + infinite cursor drift ── */
  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      // Lock the intro + subtext heights so typewriter reflow doesn't shift the layout
      const center = (self.selector!(".hero-left") as HTMLElement[])[0];
      if (center) center.style.height = `${center.offsetHeight}px`;
      const subwrap = (self.selector!(".hero-subwrap") as HTMLElement[])[0];
      if (subwrap) subwrap.style.height = `${subwrap.offsetHeight}px`;

      gsap.set(".hero-title-first", { text: "" });
      gsap.set(".hero-title-last", { text: "" });
      gsap.set(".hero-sub-text", { text: "" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => { if (center) center.style.height = ""; if (subwrap) subwrap.style.height = ""; },
      });
      tl.from(".chrome-slide", { y: -12, autoAlpha: 0, duration: 0.55, stagger: 0.07 }, 0)
        .from(".chrome-fade", { autoAlpha: 0, duration: 0.5 }, 0.2)
        // Whole text block rises + fades in
        .from(".hero-stage", { y: 30, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 0.1)
        // Waving-hand chip pops in above the greeting
        .from(".hero-wave", { autoAlpha: 0, scale: 0.4, y: 10, duration: 0.5, ease: "back.out(1.9)" }, 0.4)
        .from(".hero-eyebrow", { autoAlpha: 0, y: 10, duration: 0.5 }, 0.45)
        // Eyebrow marker underline draws itself in
        .from(".hero-eyebrow-underline path", { drawSVG: "0%", duration: 0.5, ease: "power1.inOut" }, 0.65)
        // Name — typewriter, both parts in ink
        .to(".hero-title-first", { duration: 0.55, text: NAME_FIRST, ease: "none" }, 0.6)
        .to(".hero-title-last", { duration: 0.5, text: NAME_LAST, ease: "none" }, 1.15)
        // Highlighter swipes across the last name, like marking a key idea
        .from(".hero-highlight", { scaleX: 0, transformOrigin: "0% 50%", duration: 0.45, ease: "power2.out" }, 1.6)
        // Sparkle doodles pop on the highlighted word
        .from(".hero-sparkles", { scale: 0, rotate: -35, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2)" }, 1.9)
        // Subheading fades up, then types in word-by-word
        .from(".hero-subwrap", { autoAlpha: 0, y: 14, duration: 0.5 }, 1.5)
        .to(".hero-sub-text", { duration: 1.2, text: { value: COPY.subheading, delimiter: " " }, ease: "none" }, 1.7);

      // ── Soft, endless life ──
      gsap.to(".hero-sparkles", { scale: 1.14, rotation: 6, transformOrigin: "50% 50%", duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.8 });
      // The hand gives a small, periodic wave (a couple of tilts, then rests) — subtle, on-theme
      gsap.set(".hero-wave-hand", { transformOrigin: "62% 88%" });
      gsap.timeline({ repeat: -1, repeatDelay: 3.4, delay: 1.4 })
        .to(".hero-wave-hand", { rotation: 17, duration: 0.2, ease: "sine.inOut" })
        .to(".hero-wave-hand", { rotation: -11, duration: 0.28, ease: "sine.inOut" })
        .to(".hero-wave-hand", { rotation: 14, duration: 0.26, ease: "sine.inOut" })
        .to(".hero-wave-hand", { rotation: 0, duration: 0.22, ease: "sine.inOut" });

      // Floating cursor drift — smooth, endless
      const cursors = self.selector!(".collab-cursor") as HTMLElement[];
      cursors.forEach((el, i) => {
        const c = COLLABS[i];
        if (!c) return;
        gsap.to(el, { keyframes: { x: c.loop.x, y: c.loop.y }, duration: c.dur, repeat: -1, ease: "sine.inOut" });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* ── screen → board coordinates (zoom-aware, origin centre) ── */
  const toBoard = useCallback((clientX: number, clientY: number): Pt => {
    const rect = surfaceRef.current!.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    return { x: (clientX - rect.left - cx) / zoom + cx, y: (clientY - rect.top - cy) / zoom + cy };
  }, [zoom]);

  const pushHistory = useCallback(() => {
    historyRef.current.push(elementsRef.current);
    if (historyRef.current.length > 80) historyRef.current.shift();
    redoRef.current = [];
  }, []);
  const undo = useCallback(() => {
    const prev = historyRef.current.pop();
    if (prev) { redoRef.current.push(elementsRef.current); setElements(prev); setSelectedId(null); setEditingId(null); }
  }, []);
  const redo = useCallback(() => {
    const next = redoRef.current.pop();
    if (next) { historyRef.current.push(elementsRef.current); setElements(next); setSelectedId(null); setEditingId(null); }
  }, []);

  const updateEl = useCallback((id: string, patch: Partial<El>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? ({ ...e, ...patch } as El) : e)));
  }, []);
  const deleteEl = useCallback((id: string) => {
    pushHistory(); setElements((prev) => prev.filter((e) => e.id !== id)); setSelectedId(null); setEditingId(null);
  }, [pushHistory]);
  const beginEdit = useCallback((id: string) => { requestAnimationFrame(() => setEditingId(id)); }, []);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t?.isContentEditable || t?.tagName === "INPUT" || t?.tagName === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
      if (typing) return;
      if ((e.key === "Backspace" || e.key === "Delete") && selectedId) { e.preventDefault(); deleteEl(selectedId); return; }
      if (e.key === "Escape") { setSelectedId(null); setEditingId(null); return; }
      const map: Record<string, Tool> = { v: "select", t: "text", s: "sticky", r: "shape", c: "connector", p: "pen" };
      const tk = map[e.key.toLowerCase()];
      if (tk) { setTool(tk); setSelectedId(null); setEditingId(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, undo, redo, deleteEl]);

  const createAt = useCallback((bx: number, by: number, forceSticky = false) => {
    const t = forceSticky ? "sticky" : tool;
    let el: El;
    if (t === "sticky") el = { id: uid(), kind: "sticky", x: bx - 66, y: by - 66, w: 132, h: 132, text: "", color: STICKY[newColor] };
    else if (t === "text") el = { id: uid(), kind: "text", x: bx - 4, y: by - 16, text: "" };
    else if (t === "shape") {
      const w = shapeKind === "rect" ? 160 : 128, h = shapeKind === "rect" ? 96 : 128;
      el = { id: uid(), kind: "shape", x: bx - w / 2, y: by - h / 2, w, h, shape: shapeKind, color: STICKY[newColor], text: "" };
    } else return;
    pushHistory();
    setElements((prev) => [...prev, el]);
    setSelectedId(el.id); setTool("select");
    if (el.kind === "sticky" || el.kind === "text") beginEdit(el.id);
  }, [tool, newColor, shapeKind, pushHistory, beginEdit]);

  const quickAddSticky = useCallback(() => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;
    const c = toBoard(rect.left + rect.width * 0.5, rect.top + rect.height * 0.4);
    createAt(c.x, c.y, true);
  }, [toBoard, createAt]);

  /* surface pointer */
  const onSurfaceDown = useCallback((e: React.PointerEvent) => {
    if (editingId) (document.activeElement as HTMLElement)?.blur();
    const { x, y } = toBoard(e.clientX, e.clientY);
    if (tool === "pen" || tool === "connector") {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setSelectedId(null); drawStartRef.current = { x, y }; setDrawing([{ x, y }]); return;
    }
    if (tool === "select") { setSelectedId(null); setEditingId(null); return; }
    createAt(x, y);
  }, [tool, editingId, toBoard, createAt]);

  const onSurfaceMove = useCallback((e: React.PointerEvent) => {
    if (!drawing) return;
    const { x, y } = toBoard(e.clientX, e.clientY);
    if (tool === "connector") setDrawing([drawStartRef.current, { x, y }]);
    else setDrawing((prev) => (prev ? [...prev, { x, y }] : prev));
  }, [drawing, tool, toBoard]);

  const onSurfaceUp = useCallback(() => {
    if (!drawing) return;
    const variant: "pen" | "arrow" = tool === "connector" ? "arrow" : "pen";
    const ok = variant === "arrow" ? drawing.length >= 2 : drawing.length > 1;
    if (ok) { pushHistory(); setElements((prev) => [...prev, { id: uid(), kind: "draw", x: 0, y: 0, points: drawing, color: PEN_INK, variant }]); }
    setDrawing(null);
  }, [drawing, tool, pushHistory]);

  /* element drag */
  const onElDown = useCallback((e: React.PointerEvent, el: El) => {
    if (tool !== "select") return;
    e.stopPropagation(); setSelectedId(el.id);
    if (editingId === el.id) return;
    const p = toBoard(e.clientX, e.clientY); pushHistory();
    dragRef.current = { id: el.id, ox: p.x - el.x, oy: p.y - el.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [tool, editingId, toBoard, pushHistory]);
  const onElMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current; if (!d) return;
    const p = toBoard(e.clientX, e.clientY); updateEl(d.id, { x: p.x - d.ox, y: p.y - d.oy });
  }, [toBoard, updateEl]);
  const onElUp = useCallback(() => { dragRef.current = null; }, []);

  /* element resize — drag the bottom-right handle (window listeners = robust) */
  const onResizeDown = useCallback((e: React.PointerEvent, el: El) => {
    if (tool !== "select") return;
    e.stopPropagation();
    const p0 = toBoard(e.clientX, e.clientY); pushHistory();
    const eid = el.id, kind = el.kind;
    const startW = "w" in el ? el.w : 0, startH = "h" in el ? el.h : 0;
    const startFont = el.kind === "text" ? (el.fontSize ?? 19) : 0;
    const move = (ev: PointerEvent) => {
      const p = toBoard(ev.clientX, ev.clientY);
      const dx = p.x - p0.x, dy = p.y - p0.y;
      if (kind === "text") updateEl(eid, { fontSize: Math.round(Math.min(160, Math.max(12, startFont + (dx + dy) * 0.16))) });
      else updateEl(eid, { w: Math.max(64, Math.round(startW + dx)), h: Math.max(48, Math.round(startH + dy)) });
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }, [tool, toBoard, pushHistory, updateEl]);
  const resizeHandle = (el: El) => (
    <div onPointerDown={(e) => onResizeDown(e, el)}
      aria-label="Resize" style={{ position: "absolute", right: -7, bottom: -7, width: 15, height: 15, borderRadius: 3, background: "#fff", border: `2px solid ${MIRO_BLUE}`, boxShadow: "0 1px 3px rgba(9,30,66,0.28)", cursor: "nwse-resize", zIndex: 7, touchAction: "none" }} />
  );

  const zoomBy = (f: number) => setZoom((z) => Math.min(2, Math.max(0.4, +(z * f).toFixed(2))));

  const surfaceCursor = tool === "select" ? "default" : "crosshair";
  const touchAction = tool === "select" && !dragRef.current ? "pan-y" : "none";

  /* render an interactive element */
  const renderEl = (el: El) => {
    const selected = selectedId === el.id, editing = editingId === el.id;
    const common = {
      onPointerDown: (e: React.PointerEvent) => onElDown(e, el),
      onPointerMove: onElMove, onPointerUp: onElUp,
      onDoubleClick: (e: React.MouseEvent) => { e.stopPropagation(); if (el.kind !== "draw") { setSelectedId(el.id); pushHistory(); beginEdit(el.id); } },
    };
    const ring = selected ? `0 0 0 2px ${MIRO_BLUE}` : "none";

    if (el.kind === "sticky") return (
      <div key={el.id} {...common} style={{
        position: "absolute", left: el.x, top: el.y, width: el.w, height: el.h, background: el.color, borderRadius: 3, padding: 12,
        boxShadow: `${selected ? MIRO_BLUE + " 0 0 0 2px, " : ""}0 6px 14px rgba(9,30,66,0.16)`,
        display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: selected ? 22 : 14,
        cursor: tool === "select" ? (editing ? "text" : "move") : "inherit",
        animation: "miro-pop 0.28s cubic-bezier(0.16,1,0.3,1)", userSelect: editing ? "text" : "none", touchAction: "none",
      }}>
        <EditableText value={el.text} editing={editing} placeholder="Type…" onInput={(v) => updateEl(el.id, { text: v })}
          onBlur={() => setEditingId(null)} onKeyDown={(ev) => { if (ev.key === "Escape") (ev.currentTarget as HTMLElement).blur(); }}
          style={{ fontFamily: FONT, fontSize: 15, fontWeight: 500, color: INK, lineHeight: 1.3, width: "100%" }} />
        {selected && <Handles />}
        {selected && !editing && <ContextBar colors onColor={(c) => { pushHistory(); updateEl(el.id, { color: STICKY[c] }); }} onDelete={() => deleteEl(el.id)} />}
        {selected && !editing && resizeHandle(el)}
      </div>
    );

    if (el.kind === "shape") return (
      <div key={el.id} {...common} style={{
        position: "absolute", left: el.x, top: el.y, width: el.w, height: el.h, background: el.color, zIndex: selected ? 22 : 14,
        borderRadius: el.shape === "ellipse" ? "50%" : 10, boxShadow: `${ring === "none" ? "" : ring + ", "}0 2px 8px rgba(9,30,66,0.10)`,
        border: "1px solid rgba(9,30,66,0.10)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
        cursor: tool === "select" ? (editing ? "text" : "move") : "inherit", animation: "miro-pop 0.28s cubic-bezier(0.16,1,0.3,1)",
        userSelect: editing ? "text" : "none", touchAction: "none",
      }}>
        <EditableText value={el.text} editing={editing} placeholder="" onInput={(v) => updateEl(el.id, { text: v })}
          onBlur={() => setEditingId(null)} onKeyDown={(ev) => { if (ev.key === "Escape") (ev.currentTarget as HTMLElement).blur(); }}
          style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: INK, lineHeight: 1.3 }} />
        {selected && <Handles />}
        {selected && !editing && <ContextBar colors onColor={(c) => { pushHistory(); updateEl(el.id, { color: STICKY[c] }); }} onDelete={() => deleteEl(el.id)} />}
        {selected && !editing && resizeHandle(el)}
      </div>
    );

    if (el.kind === "text") return (
      <div key={el.id} {...common} style={{
        position: "absolute", left: el.x, top: el.y, minWidth: 30, padding: "2px 4px", boxShadow: ring, borderRadius: 4,
        zIndex: selected ? 22 : 14,
        cursor: tool === "select" ? (editing ? "text" : "move") : "inherit", animation: "miro-pop 0.24s cubic-bezier(0.16,1,0.3,1)",
        userSelect: editing ? "text" : "none", touchAction: "none",
      }}>
        <EditableText value={el.text} editing={editing} placeholder="Text" onInput={(v) => updateEl(el.id, { text: v })}
          onBlur={() => { if (!el.text.trim()) deleteEl(el.id); else setEditingId(null); }}
          onKeyDown={(ev) => { if (ev.key === "Escape") (ev.currentTarget as HTMLElement).blur(); }}
          style={{ fontFamily: FONT, fontSize: el.fontSize ?? 19, fontWeight: 500, color: INK }} />
        {selected && <Handles />}
        {selected && !editing && <ContextBar colors={false} onColor={() => {}} onDelete={() => deleteEl(el.id)} />}
        {selected && !editing && resizeHandle(el)}
      </div>
    );
    return null;
  };

  const renderDrawOverlay = () => {
    const draws = elements.filter((e): e is DrawEl => e.kind === "draw");
    return (<>
      {draws.map((d) => {
        const selected = selectedId === d.id, b = bbox(d.points);
        const isArrow = d.variant === "arrow";
        const a = d.points[0], z = d.points[d.points.length - 1];
        return (
          <g key={d.id} transform={`translate(${d.x} ${d.y})`}>
            <path d={isArrow ? `M ${a.x} ${a.y} L ${z.x} ${z.y}` : toPath(d.points)} stroke="transparent" strokeWidth={20} fill="none"
              strokeLinecap="round" style={{ pointerEvents: tool === "select" ? "stroke" : "none", cursor: "move" }}
              onPointerDown={(e) => onElDown(e as unknown as React.PointerEvent, d)} onPointerMove={(e) => onElMove(e as unknown as React.PointerEvent)} onPointerUp={onElUp} />
            <path d={isArrow ? `M ${a.x} ${a.y} L ${z.x} ${z.y}` : toPath(d.points)} stroke={d.color} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: "none" }} />
            {isArrow && <path d={arrowHead(a, z)} stroke={d.color} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: "none" }} />}
            {selected && <rect x={b.minX - 8} y={b.minY - 8} width={b.maxX - b.minX + 16} height={b.maxY - b.minY + 16} fill="none" stroke={MIRO_BLUE} strokeWidth={1.5} rx={4} style={{ pointerEvents: "none" }} />}
          </g>
        );
      })}
      {drawing && drawing.length > 1 && (
        tool === "connector"
          ? <g><path d={`M ${drawing[0].x} ${drawing[0].y} L ${drawing[1].x} ${drawing[1].y}`} stroke={PEN_INK} strokeWidth={3} fill="none" strokeLinecap="round" style={{ pointerEvents: "none" }} /><path d={arrowHead(drawing[0], drawing[1])} stroke={PEN_INK} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: "none" }} /></g>
          : <path d={toPath(drawing)} stroke={PEN_INK} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: "none" }} />
      )}
    </>);
  };

  const selectedDraw = elements.find((e) => e.id === selectedId && e.kind === "draw") as DrawEl | undefined;

  /* ── chrome button styles ── */
  const iconBtn: React.CSSProperties = { display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 8, border: "none", background: "transparent", color: INK, cursor: "pointer" };
  const hoverBg = (on: boolean) => (e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.background = on ? "rgba(9,30,66,0.05)" : "transparent");

  return (
    <section ref={rootRef} className="hero-cursor-zone relative w-full overflow-hidden" style={{ height: "100svh" }} aria-label="Interactive Miro-style canvas hero">
      {/* Canvas surface */}
      <div ref={surfaceRef} className="miro-surface absolute inset-0" style={{ cursor: surfaceCursor, touchAction, userSelect: "none" }}
        onPointerDown={onSurfaceDown} onPointerMove={onSurfaceMove} onPointerUp={onSurfaceUp}>
        {/* Zoomable board content */}
        <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}>
          {/* SVG: drawings + connectors */}
          <svg className="absolute inset-0" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden>{renderDrawOverlay()}</svg>

          {/* Centre heading — centred text stack */}
          <div className="hero-layout absolute inset-0">
            <div className="hero-stage">
              {/* ── eyebrow · name (all centred) ── */}
              <div className="hero-left">
                {/* subtle waving-hand chip — greets above "hello, my name is" */}
                <div className="hero-wave-wrap" aria-hidden style={{ marginBottom: 20 }}>
                  <span className="hero-wave" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 999, background: "#fff", border: "1px solid rgba(9,30,66,0.05)", boxShadow: "var(--miro-shadow)" }}>
                    <HandWaving className="hero-wave-hand" size={24} weight="fill" color="#E39B3C" style={{ transformOrigin: "62% 88%" }} />
                  </span>
                </div>
                <p className="hero-eyebrow" style={{ fontFamily: FONT, margin: 0 }}>
                  <span style={{ position: "relative", display: "inline-block", textTransform: "uppercase", letterSpacing: "0.26em", fontSize: "clamp(12px, 1.2vw, 15px)", color: "#6A6470", fontWeight: 700 }}>
                    {COPY.eyebrow}
                    <svg className="hero-eyebrow-underline" aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" style={{ position: "absolute", left: "-3%", width: "106%", bottom: -12, height: 10, overflow: "visible", pointerEvents: "none" }}>
                      <path d="M1 6 C 20 3, 52 3, 84 5 C 92 5.4, 97 4, 100 1.5" fill="none" stroke="#E39B3C" strokeWidth={2.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                </p>
                <h1 className="hero-title" aria-label={COPY.heading} style={{ fontFamily: FONT, fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.03em", color: INK, margin: "18px 0 0", whiteSpace: "nowrap" }}>
                  <span className="hero-title-first" aria-hidden>{NAME_FIRST}</span>{" "}
                  <span style={{ position: "relative", display: "inline-block", marginLeft: "0.12em" }}>
                    <span className="hero-highlight" aria-hidden style={{ position: "absolute", left: -5, right: -10, top: "16%", bottom: "9%", background: HIGHLIGHT, borderRadius: "7px 14px 8px 12px", transform: "rotate(-1.2deg)", zIndex: 0 }} />
                    <span className="hero-title-last" aria-hidden style={{ position: "relative", zIndex: 1, color: INK }}>{NAME_LAST}</span>
                    <svg className="hero-sparkles" aria-hidden width="50" height="46" viewBox="0 0 54 50" style={{ position: "absolute", top: -24, right: -32, overflow: "visible", pointerEvents: "none" }}>
                      <path d="M35 4 C36.6 13, 40 16.4, 49 18 C40 19.6, 36.6 23, 35 32 C33.4 23, 30 19.6, 21 18 C30 16.4, 33.4 13, 35 4Z" fill={INK} />
                      <path d="M14 25 C14.7 30, 16.8 32, 21.5 32.8 C16.8 33.6, 14.7 36, 14 41 C13.3 36, 11.2 33.6, 6.5 32.8 C11.2 32, 13.3 30, 14 25Z" fill={INK} />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* subheading — plain text, centred below the name */}
              <div className="hero-subwrap">
                <p className="hero-sub" aria-label={COPY.subheading} style={{ fontFamily: FONT, margin: 0 }}>
                  <span className="hero-sub-text" aria-hidden>{COPY.subheading}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Interactive elements */}
          {elements.map(renderEl)}

          {/* Draw context bar */}
          {selectedDraw && (() => { const b = bbox(selectedDraw.points); return (
            <div style={{ position: "absolute", left: selectedDraw.x + b.minX, top: selectedDraw.y + b.minY - 46 }}>
              <ContextBar colors={false} onColor={() => {}} onDelete={() => deleteEl(selectedDraw.id)} />
            </div>
          ); })()}

          {/* Floating cursors */}
          {COLLABS.map((c) => <CollabCursor key={c.name} name={c.name} color={c.color} left={c.left} top={c.top} />)}
        </div>
      </div>

      {/* ═══════════ TOP BAR — left: board panel ═══════════ */}
      <div className="chrome-slide hidden lg:flex absolute items-center" style={{ left: 18, top: 16, height: 52, padding: "0 8px 0 14px", background: "#fff", borderRadius: 14, boxShadow: "var(--miro-shadow)", border: "1px solid rgba(9,30,66,0.05)", zIndex: 40, gap: 6 }}>
        <span style={{ display: "grid", placeItems: "center", width: 26, height: 26, borderRadius: 7, background: MIRO_BLUE, color: "#fff", fontWeight: 800, fontSize: 13, fontFamily: FONT }}>N</span>
        <span className="hidden 2xl:inline" style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: INK, marginLeft: 4, marginRight: 4 }}>{COPY.boardName}</span>
        <span className="2xl:hidden" style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: INK, margin: "0 4px" }}>Portfolio</span>
        <span style={{ width: 1, height: 22, background: "rgba(9,30,66,0.10)", margin: "0 2px" }} />
        {[List, Export, MagnifyingGlass].map((Ico, i) => (
          <button key={i} className={`miro-tool-btn place-items-center ${i > 0 ? "hidden 2xl:grid" : "grid"}`} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: "transparent", color: INK, cursor: "pointer" }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)} aria-label="board action">
            <Ico size={19} weight="regular" />
          </button>
        ))}
      </div>

      {/* ═══════════ TOP BAR — right: apps / present / avatars / share ═══════════ */}
      <div className="chrome-slide hidden lg:flex absolute items-center" style={{ right: 18, top: 16, gap: 10, zIndex: 40 }}>
        <div className="hidden xl:flex items-center" style={{ height: 52, padding: "0 12px", background: "#fff", borderRadius: 14, boxShadow: "var(--miro-shadow)", border: "1px solid rgba(9,30,66,0.05)" }}>
          <div style={{ display: "flex" }}>
            {[{ i: "PR", c: "#F25EA6" }, { i: "MK", c: "#2AA79B" }].map((a, idx) => (
              <span key={a.i} style={{ width: 30, height: 30, borderRadius: "50%", background: a.c, color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, fontFamily: FONT, border: "2px solid #fff", marginLeft: idx === 0 ? 0 : -8 }}>{a.i}</span>
            ))}
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#EDEEF2", color: INK, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, fontFamily: FONT, border: "2px solid #fff", marginLeft: -8 }}>12</span>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#F5A623", color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, fontFamily: FONT, border: "2px solid #3FB950", marginLeft: -8 }}>NP</span>
          </div>
        </div>
        <button className="hidden 2xl:flex miro-tool-btn items-center" style={{ height: 52, padding: "0 16px", gap: 8, background: "#fff", borderRadius: 14, boxShadow: "var(--miro-shadow)", border: "1px solid rgba(9,30,66,0.05)", fontFamily: FONT, fontSize: 14, fontWeight: 500, color: INK, cursor: "pointer" }}>
          Present <CaretDown size={14} weight="bold" />
        </button>
        <button className="miro-tool-btn flex items-center" style={{ height: 52, padding: "0 18px", gap: 8, background: MIRO_BLUE, borderRadius: 14, border: "none", color: "#fff", fontFamily: FONT, fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(66,98,255,0.3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3350E0")} onMouseLeave={(e) => (e.currentTarget.style.background = MIRO_BLUE)}>
          <UserPlus size={18} weight="bold" /> Share
        </button>
      </div>

      {/* ═══════════ LEFT TOOLBAR ═══════════ */}
      <div className="chrome-fade absolute z-40 flex items-center left-1/2 -translate-x-1/2 bottom-5 flex-col-reverse
                      md:left-[16px] md:top-1/2 md:bottom-auto md:translate-x-0 md:-translate-y-1/2 md:flex-row">
        <div className="flex flex-row md:flex-col" style={{ gap: 3, padding: 6, background: "#fff", borderRadius: 16, boxShadow: "var(--miro-shadow-lg)", border: "1px solid rgba(9,30,66,0.05)" }}>
          {TOOLS.map((tl) => {
            const active = tool === tl.id;
            return (
              <button key={tl.id} title={`${tl.label} (${tl.key})`} aria-label={tl.label} aria-pressed={active}
                onClick={() => { setTool(tl.id); if (tl.id !== "select") { setSelectedId(null); setEditingId(null); } }} className="miro-tool-btn"
                style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer",
                  background: active ? "var(--miro-blue-soft)" : "transparent", color: active ? MIRO_BLUE : INK }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(9,30,66,0.05)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <tl.Icon size={22} weight={active ? "fill" : "regular"} />
              </button>
            );
          })}
          <button title="Add a sticky note" aria-label="Add sticky note" onClick={quickAddSticky} className="miro-tool-btn hidden md:grid"
            style={{ placeItems: "center", width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer", background: INK, color: "#fff" }}>
            <Plus size={20} weight="bold" />
          </button>
          <span className="self-stretch shrink-0 w-px md:w-auto md:h-px" style={{ background: "rgba(9,30,66,0.08)", margin: 3 }} />
          <button title="Undo (⌘Z)" aria-label="Undo" onClick={undo} className="miro-tool-btn" style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: INK }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)}><ArrowUUpLeft size={22} /></button>
          <button title="Redo (⌘⇧Z)" aria-label="Redo" onClick={redo} className="miro-tool-btn hidden md:grid" style={{ placeItems: "center", width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: INK }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)}><ArrowUUpRight size={22} /></button>
        </div>

        {(tool === "sticky" || tool === "shape") && (
          <div className="flex flex-col mb-2 md:mb-0 md:ml-2.5"
            style={{ padding: 10, background: "#fff", borderRadius: 12, boxShadow: "var(--miro-shadow-lg)", border: "1px solid rgba(9,30,66,0.05)", gap: 10 }}>
            {tool === "shape" && (
              <div style={{ display: "flex", gap: 6 }}>
                {([["rect", Square], ["ellipse", Circle]] as [ShapeKind, React.ElementType][]).map(([k, Ico]) => (
                  <button key={k} aria-label={k} onClick={() => setShapeKind(k)} className="miro-tool-btn"
                    style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 8, cursor: "pointer", border: "none",
                      background: shapeKind === k ? "var(--miro-blue-soft)" : "rgba(9,30,66,0.04)", color: shapeKind === k ? MIRO_BLUE : INK }}>
                    <Ico size={18} />
                  </button>
                ))}
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7 }}>
              {PALETTE.map((c) => (
                <button key={c} aria-label={c} onClick={() => setNewColor(c)} className="miro-tool-btn"
                  style={{ width: 22, height: 22, borderRadius: "50%", background: STICKY[c], cursor: "pointer", border: newColor === c ? `2px solid ${INK}` : "1px solid rgba(9,30,66,0.12)" }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════ BOTTOM-LEFT: frames ═══════════ */}
      <div className="chrome-slide hidden md:flex absolute" style={{ left: 18, bottom: 20, padding: 6, background: "#fff", borderRadius: 12, boxShadow: "var(--miro-shadow)", border: "1px solid rgba(9,30,66,0.05)", zIndex: 40 }}>
        <button className="miro-tool-btn" style={{ ...iconBtn, width: 38, height: 38 }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)} aria-label="frames"><SidebarSimple size={20} /></button>
      </div>

      {/* ═══════════ BOTTOM-RIGHT: zoom / help / AI ═══════════ */}
      <div className="chrome-slide hidden md:flex absolute items-center" style={{ right: 18, bottom: 20, gap: 10, zIndex: 40 }}>
        <div className="flex items-center" style={{ padding: 4, gap: 2, background: "#fff", borderRadius: 12, boxShadow: "var(--miro-shadow)", border: "1px solid rgba(9,30,66,0.05)" }}>
          <button aria-label="Zoom out" onClick={() => zoomBy(1 / 1.15)} className="miro-tool-btn" style={{ ...iconBtn, width: 32, height: 32 }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)}><Minus size={17} /></button>
          <button aria-label="Reset zoom" onClick={() => setZoom(1)} className="miro-tool-btn" style={{ ...iconBtn, width: 50, fontFamily: FONT, fontSize: 12.5, fontWeight: 600 }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)}>{Math.round(zoom * 100)}%</button>
          <button aria-label="Zoom in" onClick={() => zoomBy(1.15)} className="miro-tool-btn" style={{ ...iconBtn, width: 32, height: 32 }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)}><Plus size={17} /></button>
        </div>
        <div className="hidden lg:flex items-center" style={{ padding: 4, background: "#fff", borderRadius: 12, boxShadow: "var(--miro-shadow)", border: "1px solid rgba(9,30,66,0.05)" }}>
          <button aria-label="Help" className="miro-tool-btn" style={{ ...iconBtn, width: 34, height: 34, borderRadius: 999 }} onMouseEnter={hoverBg(true)} onMouseLeave={hoverBg(false)}><Question size={19} /></button>
        </div>
        <button aria-label="AI" className="miro-tool-btn" style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, border: "none", background: MIRO_BLUE, color: "#fff", cursor: "pointer", boxShadow: "0 4px 12px rgba(66,98,255,0.3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3350E0")} onMouseLeave={(e) => (e.currentTarget.style.background = MIRO_BLUE)}><Sparkle size={22} weight="fill" /></button>
      </div>

      {/* Hint pill (always visible) */}
      <div className="chrome-fade absolute left-1/2 hidden md:flex items-center gap-2"
        style={{ bottom: 22, transform: "translateX(-50%)", padding: "9px 16px", background: INK, color: "#fff", borderRadius: 999, boxShadow: "var(--miro-shadow-lg)", zIndex: 30, fontFamily: FONT, fontSize: 12.5, fontWeight: 500, whiteSpace: "nowrap" }}>
        Pick a tool, then click the canvas to add · drag to move
      </div>

      {/* Soft fade-out at the hero's base so it feeds naturally into the next section */}
      <div aria-hidden className="hero-fade-out" />

      {/* ── Custom collaborator-style cursor (a labelled Miro pointer) ── */}
      <CursorProvider>
        <HeroCursor>
          <svg width="24" height="26" viewBox="0 0 22 24" fill="none" style={{ filter: "drop-shadow(0 2px 3px rgba(9,30,66,0.28))" }}>
            <path d="M3 2 L3 18 L7.4 14 L11 22 L13.8 20.8 L10.2 13 L16 13 Z" fill={MIRO_BLUE} stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        </HeroCursor>
        <CursorFollow>
          <div style={{ background: MIRO_BLUE, color: "#fff", fontFamily: FONT, fontSize: 12, fontWeight: 700, padding: "3px 11px", borderRadius: 12, boxShadow: "0 4px 12px rgba(66,98,255,0.35)", whiteSpace: "nowrap" }}>You</div>
        </CursorFollow>
      </CursorProvider>
    </section>
  );
}
