import { useRef, useLayoutEffect } from "react";
import {
  EnvelopeSimpleIcon as EnvelopeSimple,
  LinkedinLogoIcon as LinkedinLogo,
  FileTextIcon as FileText,
  ArrowUpRightIcon as ArrowUpRight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Pastel field that continues the projects mesh so the two sections blend */
const CONNECT_BLOBS = [
  { c: "rgba(200,180,239,0.48)", x: "20%", y: "22%", s: 500, dx: 82, dy: 58, d: 15 },
  { c: "rgba(158,197,246,0.44)", x: "80%", y: "30%", s: 440, dx: -90, dy: 66, d: 17 },
  { c: "rgba(246,169,208,0.32)", x: "62%", y: "80%", s: 420, dx: 66, dy: -54, d: 16 },
  { c: "rgba(183,228,155,0.32)", x: "30%", y: "84%", s: 400, dx: -64, dy: -46, d: 18 },
];

interface Contact {
  label: string;
  display: string;
  href: string;
  icon: Icon;
  external: boolean;
}

const contacts: Contact[] = [
  { label: "Email", display: "niharikap0210@gmail.com", href: "mailto:niharikap0210@gmail.com", icon: EnvelopeSimple, external: false },
  { label: "LinkedIn", display: "niharika-pundlik", href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/", icon: LinkedinLogo, external: true },
  { label: "Resume", display: "View PDF", href: "https://drive.google.com/file/d/1wXRAfG2Os-Kbt9WtR1W2ET0YSC9HRoaf/view?usp=sharing", icon: FileText, external: true },
];

export default function ConnectSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".connect-kicker, .connect-heading, .connect-status, .connect-intro", {
          y: 24, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
        });
        gsap.from(".connect-card", {
          y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".connect-cards", start: "top 88%", once: true },
        });
        // drifting pastel blobs, paused when the section is off-screen
        const blobTweens = gsap.utils.toArray<HTMLElement>(".connect-blob").map((el, i) => {
          const b = CONNECT_BLOBS[i];
          return gsap.to(el, { x: b ? b.dx : 0, y: b ? b.dy : 0, scale: 1.16, duration: b ? b.d : 16, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4 });
        });
        const st = ScrollTrigger.create({
          trigger: rootRef.current, start: "top bottom", end: "bottom top",
          onToggle: (self) => blobTweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
        });
        if (!st.isActive) blobTweens.forEach((t) => t.pause());
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="connect" className="connect-section" style={{ scrollMarginTop: 96 }} aria-label="Let's connect">
      <div className="connect-bg" aria-hidden>
        {CONNECT_BLOBS.map((b, i) => (
          <span
            key={i}
            className="connect-blob"
            style={{ left: b.x, top: b.y, width: b.s, height: b.s, marginLeft: -b.s / 2, marginTop: -b.s / 2, background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)` }}
          />
        ))}
      </div>

      <div className="connect-inner">
        <span className="connect-kicker"><span className="connect-kicker-dot" />Let's Connect</span>

        <h2 className="connect-heading">
          Let's build something{" "}
          <span className="connect-hl">
            <span className="connect-hl-mark" aria-hidden />
            <span className="connect-hl-text">together.</span>
          </span>
        </h2>

        <span className="connect-status"><span className="connect-status-dot status-pulse" />Available for work</span>

        <p className="connect-intro">
          Open to full-time Product Design roles, thoughtful side projects, and conversations about turning architectural thinking into digital products.
        </p>

        <div className="connect-cards">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="connect-card"
              aria-label={`${c.label}: ${c.display}`}
            >
              <span className="connect-card-icon"><c.icon size={20} weight="regular" aria-hidden /></span>
              <span className="connect-card-body">
                <span className="connect-card-label">{c.label}</span>
                <span className="connect-card-value">{c.display}</span>
              </span>
              <ArrowUpRight size={18} weight="bold" aria-hidden className="connect-card-arrow" />
            </a>
          ))}
        </div>

        <div className="connect-foot">
          <span>© 2026 Niharika Pundlik</span>
          <span>Product Designer · Designed &amp; built by hand</span>
        </div>
      </div>
    </section>
  );
}
