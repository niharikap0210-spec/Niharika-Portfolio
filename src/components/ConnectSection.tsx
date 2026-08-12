import { useRef, useLayoutEffect } from "react";
import {
  EnvelopeSimpleIcon as EnvelopeSimple,
  LinkedinLogoIcon as LinkedinLogo,
  FileTextIcon as FileText,
  ArrowUpRightIcon as ArrowUpRight,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".connect-kicker, .connect-heading, .connect-intro, .connect-actions", {
          y: 24, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="connect" className="connect-section" style={{ scrollMarginTop: 96 }} aria-label="Let's connect">
      {/* dotted board — fades in at the top so it merges with the projects mesh above */}
      <div className="connect-dots" aria-hidden />

      <div className="connect-inner">
        <span className="connect-kicker"><span className="connect-kicker-dot" />Let's Connect</span>

        <h2 className="connect-heading">
          Let's build something{" "}
          <span className="connect-hl">
            <span className="connect-hl-mark" aria-hidden />
            <span className="connect-hl-text">together.</span>
          </span>
        </h2>

        <p className="connect-intro">
          Open to full-time Product Design roles, thoughtful side projects, and conversations about turning architectural thinking into digital products.
        </p>

        <div className="connect-actions">
          <a className="connect-btn connect-btn-primary" href="mailto:niharikap0210@gmail.com">
            <EnvelopeSimple size={19} weight="bold" aria-hidden /> Say hello
          </a>
          <a className="connect-btn connect-btn-ghost" href="https://www.linkedin.com/in/niharika-pundlik-63a9a1288/" target="_blank" rel="noopener noreferrer">
            <LinkedinLogo size={19} weight="regular" aria-hidden /> LinkedIn
            <ArrowUpRight size={15} weight="bold" aria-hidden className="connect-btn-arrow" />
          </a>
          <a className="connect-btn connect-btn-ghost" href="https://drive.google.com/file/d/1wXRAfG2Os-Kbt9WtR1W2ET0YSC9HRoaf/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <FileText size={19} weight="regular" aria-hidden /> Resume
            <ArrowUpRight size={15} weight="bold" aria-hidden className="connect-btn-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
