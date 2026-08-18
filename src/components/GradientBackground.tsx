import { useRef, useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";

/* Animated grain overlay — a tiling noise pattern refreshed on rAF.
   Pauses off-screen and respects prefers-reduced-motion (one static frame). */
interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
  intensity?: number;
}

function Noise({
  patternSize = 100,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 1,
  patternAlpha = 50,
  intensity = 1,
}: NoiseProps) {
  const grainRef = useRef<HTMLCanvasElement>(null);
  const cssSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const len = patternSize * patternSize * 4;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (canvas.parentElement) {
        const r = canvas.parentElement.getBoundingClientRect();
        w = r.width; h = r.height;
      }
      cssSizeRef.current = { width: w, height: h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const updatePattern = () => {
      for (let i = 0; i < len; i += 4) {
        const v = Math.random() * 255 * intensity;
        patternData.data[i] = v;
        patternData.data[i + 1] = v;
        patternData.data[i + 2] = v;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };
    const drawGrain = () => {
      const { width: w, height: h } = cssSizeRef.current;
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      const sx = Math.max(0.001, patternScaleX);
      const sy = Math.max(0.001, patternScaleY);
      ctx.scale(sx, sy);
      const fill = ctx.createPattern(patternCanvas, "repeat");
      if (fill) { ctx.fillStyle = fill; ctx.fillRect(0, 0, w / sx, h / sy); }
      ctx.restore();
    };

    resize();
    window.addEventListener("resize", resize);

    // Reduced motion (or refresh disabled): one still frame.
    if (reduced || patternRefreshInterval <= 0) {
      updatePattern();
      drawGrain();
      const onResize = () => { resize(); updatePattern(); drawGrain(); };
      window.addEventListener("resize", onResize);
      return () => { window.removeEventListener("resize", resize); window.removeEventListener("resize", onResize); };
    }

    let raf = 0;
    let frame = 0;
    let running = false;
    const loop = () => {
      if (cssSizeRef.current.width > 0 && cssSizeRef.current.height > 0 && frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame++;
      raf = window.requestAnimationFrame(loop);
    };
    const start = () => { if (running) return; running = true; raf = window.requestAnimationFrame(loop); };
    const stop = () => { running = false; if (raf) window.cancelAnimationFrame(raf); };

    const io = new IntersectionObserver((e) => (e[0].isIntersecting ? start() : stop()), { rootMargin: "120px" });
    io.observe(canvas);

    return () => {
      window.removeEventListener("resize", resize);
      io.disconnect();
      stop();
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, intensity]);

  return <canvas className="absolute inset-0 w-full h-full pointer-events-none" ref={grainRef} aria-hidden />;
}

type ColorStop = { color: string; stop: string };
type GradientType = "radial-gradient" | "linear-gradient" | "conic-gradient";

interface GradientBackgroundProps {
  gradientType?: GradientType;
  gradientSize?: string;
  gradientOrigin?: string;
  colors?: ColorStop[];
  enableNoise?: boolean;
  noisePatternSize?: number;
  noisePatternScaleX?: number;
  noisePatternScaleY?: number;
  noisePatternRefreshInterval?: number;
  noisePatternAlpha?: number;
  noiseIntensity?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  customGradient?: string | null;
}

function GradientBackground({
  gradientType = "radial-gradient",
  gradientSize = "125% 125%",
  gradientOrigin = "bottom-middle",
  colors = [
    { color: "rgba(245,87,2,1)", stop: "10.5%" },
    { color: "rgba(245,120,2,1)", stop: "16%" },
    { color: "rgba(245,140,2,1)", stop: "17.5%" },
    { color: "rgba(245,170,100,1)", stop: "25%" },
    { color: "rgba(238,174,202,1)", stop: "40%" },
    { color: "rgba(202,179,214,1)", stop: "65%" },
    { color: "rgba(148,201,233,1)", stop: "100%" },
  ],
  enableNoise = true,
  noisePatternSize = 100,
  noisePatternScaleX = 1,
  noisePatternScaleY = 1,
  noisePatternRefreshInterval = 1,
  noisePatternAlpha = 50,
  noiseIntensity = 1,
  className = "",
  style = {},
  children,
  customGradient = null,
}: GradientBackgroundProps) {
  const generateGradient = () => {
    if (customGradient) return customGradient;
    const positions: Record<string, string> = {
      "bottom-middle": "50% 101%", "bottom-left": "0% 101%", "bottom-right": "100% 101%",
      "top-middle": "50% -1%", "top-left": "0% -1%", "top-right": "100% -1%",
      "left-middle": "-1% 50%", "right-middle": "101% 50%", "center": "50% 50%",
    };
    const position = positions[gradientOrigin] || positions["bottom-middle"];
    const colorStops = colors.map(({ color, stop }) => `${color} ${stop}`).join(",");

    if (gradientType === "radial-gradient") {
      return `radial-gradient(${gradientSize} at ${position},${colorStops})`;
    } else if (gradientType === "linear-gradient") {
      const angleMap: Record<string, string> = {
        "bottom-middle": "0deg", "bottom-left": "45deg", "bottom-right": "315deg",
        "top-middle": "180deg", "top-left": "135deg", "top-right": "225deg",
        "left-middle": "90deg", "right-middle": "270deg", "center": "0deg",
      };
      const angle = angleMap[gradientOrigin] || angleMap["bottom-middle"];
      return `linear-gradient(${angle},${colorStops})`;
    } else if (gradientType === "conic-gradient") {
      return `conic-gradient(from 0deg at ${position},${colorStops})`;
    }
    return `${gradientType}(${colorStops})`;
  };

  const gradientStyle: CSSProperties = { background: generateGradient(), ...style };

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`.trim()} style={gradientStyle} aria-hidden>
      {enableNoise && (
        <Noise
          patternSize={noisePatternSize}
          patternScaleX={noisePatternScaleX}
          patternScaleY={noisePatternScaleY}
          patternRefreshInterval={noisePatternRefreshInterval}
          patternAlpha={noisePatternAlpha}
          intensity={noiseIntensity}
        />
      )}
      {children}
    </div>
  );
}

export { GradientBackground };
