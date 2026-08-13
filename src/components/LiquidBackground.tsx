import { useEffect, useRef } from "react";

/* Animated "liquid" gradient — a low-frequency domain-warped WebGL shader.
   Renders behind section content; the parent supplies a CSS fallback gradient so
   it degrades gracefully where WebGL is unavailable. Pauses when off-screen and
   respects prefers-reduced-motion (one still frame). */

interface Props {
  c0?: string;   // lightest
  c1?: string;   // mid
  c2?: string;   // deep
  fade?: number; // how hard the top fades out (0 = none)
  lift?: number; // scales the specular terms for pale palettes
  grain?: number;
  className?: string;
}

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FRAG = [
  "precision highp float;",
  "uniform vec2  u_res;",
  "uniform float u_t;",
  "uniform vec3  u_c0;",
  "uniform vec3  u_c1;",
  "uniform vec3  u_c2;",
  "uniform float u_grain;",
  "uniform float u_fade;",
  "uniform float u_lift;",
  "float h(vec2 n){return fract(sin(dot(n,vec2(12.9898,78.233)))*43758.5453);}",
  "float noise(vec2 x){vec2 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);",
  "  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}",
  "float fbm(vec2 x){float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);",
  "  for(int i=0;i<5;i++){v+=a*noise(x);x=r*x*2.02;a*=.5;}return v;}",
  "void main(){",
  "  vec2 uv=gl_FragCoord.xy/u_res.xy;",
  "  vec2 q=vec2(uv.x*(u_res.x/u_res.y),uv.y)*2.9;",
  "  float t=u_t*0.06;",
  "  vec2 w1=vec2(fbm(q+vec2(0.,t)),fbm(q+vec2(5.2,1.3-t)));",
  "  vec2 w2=vec2(fbm(q+3.5*w1+vec2(1.7,9.2)+t*0.7),fbm(q+3.5*w1+vec2(8.3,2.8)-t*0.5));",
  "  float n=fbm(q+3.0*w2);",
  "  float ramp=clamp(uv.y*1.05-0.06,0.,1.);",
  "  float m=clamp(1.-ramp+ (n-0.5)*0.85,0.,1.);",
  "  vec3 col=mix(u_c0,u_c1,smoothstep(0.02,0.48,m));",
  "  col=mix(col,u_c2,smoothstep(0.42,0.98,m));",
  "  float caustic=pow(1.0-abs(w2.x-w2.y),3.5);",
  "  col+=caustic*0.30*u_lift*smoothstep(0.18,0.95,m);",
  "  float glint=pow(max(0.,n-0.52),2.0)*2.6;",
  "  col+=glint*0.16*u_lift*smoothstep(0.3,1.0,m);",
  "  float a=u_fade<=0.0?1.0:smoothstep(0.0,u_fade,1.0-uv.y);",
  "  col+=(h(gl_FragCoord.xy+u_t)-0.5)*u_grain;",
  "  gl_FragColor=vec4(col,a);",
  "}",
].join("\n");

function hexToRgb(v: string, fallback: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec((v || "").trim());
  const n = parseInt(m ? m[1] : fallback, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
}

export default function LiquidBackground({
  c0 = "f0f5fe", c1 = "dfe9fb", c2 = "c6d9f5", fade = 0, lift = 0.28, grain = 0.055, className = "",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let gl: WebGLRenderingContext | null = null;
    try { gl = cv.getContext("webgl", { alpha: true, antialias: false, depth: false }); } catch { gl = null; }
    if (!gl) return; // CSS fallback gradient carries the look

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const G = gl;

    const buf = G.createBuffer();
    G.bindBuffer(G.ARRAY_BUFFER, buf);
    G.bufferData(G.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), G.STATIC_DRAW);
    const loc = G.getAttribLocation(prog, "p");
    G.enableVertexAttribArray(loc);
    G.vertexAttribPointer(loc, 2, G.FLOAT, false, 0, 0);

    const uRes = G.getUniformLocation(prog, "u_res");
    const uT = G.getUniformLocation(prog, "u_t");
    G.uniform3fv(G.getUniformLocation(prog, "u_c0"), hexToRgb(c0, "f7f6f3"));
    G.uniform3fv(G.getUniformLocation(prog, "u_c1"), hexToRgb(c1, "b9cdf7"));
    G.uniform3fv(G.getUniformLocation(prog, "u_c2"), hexToRgb(c2, "2b59d1"));
    G.uniform1f(G.getUniformLocation(prog, "u_grain"), grain);
    G.uniform1f(G.getUniformLocation(prog, "u_fade"), fade);
    G.uniform1f(G.getUniformLocation(prog, "u_lift"), lift);

    // Half resolution — the image is all low-frequency, so it holds up.
    const size = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      const w = Math.max(2, Math.round(r.width * dpr));
      const h = Math.max(2, Math.round(r.height * dpr));
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; G.viewport(0, 0, w, h); }
      G.uniform2f(uRes, cv.width, cv.height);
    };
    const draw = (t: number) => { G.uniform1f(uT, t); G.drawArrays(G.TRIANGLES, 0, 3); };

    size();
    cv.classList.add("is-on");

    if (reduced) {
      draw(12);
      const onResize = () => { size(); draw(12); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0, t0 = 0, live = false;
    const frame = (now: number) => { if (!t0) t0 = now; draw((now - t0) / 1000); raf = requestAnimationFrame(frame); };
    const run = (on: boolean) => {
      if (on === live) return;
      live = on;
      if (on) raf = requestAnimationFrame(frame); else cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver((entries) => run(entries[0].isIntersecting), { rootMargin: "120px" });
    io.observe(cv);
    const onResize = () => size();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [c0, c1, c2, fade, lift, grain]);

  return <canvas ref={ref} className={`liquid ${className}`.trim()} aria-hidden />;
}
