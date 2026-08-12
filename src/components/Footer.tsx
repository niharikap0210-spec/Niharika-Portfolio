import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeSimpleIcon as EnvelopeSimple,
  ArrowUpIcon as ArrowUp,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "mailto:niharikap0210@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/";
const RESUME = "https://drive.google.com/file/d/1wXRAfG2Os-Kbt9WtR1W2ET0YSC9HRoaf/view?usp=sharing";

const pages = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/about" },
];
const elsewhere = [
  { label: "LinkedIn", href: LINKEDIN },
  { label: "Email", href: EMAIL },
  { label: "Resume", href: RESUME },
];

const isHttp = (h: string) => h.startsWith("http");

/* Combined "Let's connect" + site footer (global, on every page) */
export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cfooter-reveal", {
          y: 26, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} id="connect" className="cfooter" aria-label="Let's connect">
      <span className="cfooter-mark" aria-hidden>Niharika</span>

      <div className="cfooter-inner">
        <div className="cfooter-grid">
          {/* CTA */}
          <div className="cfooter-cta cfooter-reveal">
            <span className="cfooter-kicker"><span className="cfooter-kicker-dot" />Let's Connect</span>
            <h2 className="cfooter-heading">
              Let's build something{" "}
              <span className="cfooter-hl">
                <span className="cfooter-hl-mark" aria-hidden />
                <span className="cfooter-hl-text">together.</span>
              </span>
            </h2>
            <p className="cfooter-sub">
              Open to full-time Product Design roles, thoughtful side projects, and good conversations about turning architectural thinking into digital products.
            </p>
            <a className="cfooter-btn" href={EMAIL}>
              <EnvelopeSimple size={18} weight="bold" aria-hidden /> Get in touch
            </a>
          </div>

          {/* nav columns */}
          <div className="cfooter-cols cfooter-reveal">
            <div className="cfooter-col">
              <span className="cfooter-col-title">Pages</span>
              {pages.map((p) => (
                <Link key={p.label} to={p.href} className="cfooter-link">{p.label}</Link>
              ))}
            </div>
            <div className="cfooter-col">
              <span className="cfooter-col-title">Elsewhere</span>
              {elsewhere.map((l) => (
                <a key={l.label} href={l.href} target={isHttp(l.href) ? "_blank" : undefined} rel={isHttp(l.href) ? "noopener noreferrer" : undefined} className="cfooter-link">{l.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="cfooter-bottom cfooter-reveal">
          <Link to="/" className="cfooter-brand" aria-label="Niharika Pundlik — home">
            <span className="cfooter-logo">NP</span>
            <span className="cfooter-name">Niharika Pundlik</span>
          </Link>
          <span className="cfooter-copy">© 2026 · Product Designer, architect by training</span>
          <button className="cfooter-toptop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top <ArrowUp size={14} weight="bold" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
