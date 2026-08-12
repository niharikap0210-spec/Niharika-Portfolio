import { Link } from "react-router-dom";
import {
  LinkedinLogoIcon as LinkedinLogo,
  EnvelopeSimpleIcon as EnvelopeSimple,
  FileArrowDownIcon as FileArrowDown,
  ArrowUpIcon as ArrowUp,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const socials: { icon: Icon; href: string; label: string }[] = [
  { icon: LinkedinLogo, href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/", label: "LinkedIn" },
  { icon: EnvelopeSimple, href: "mailto:niharikap0210@gmail.com", label: "Email" },
  { icon: FileArrowDown, href: "https://drive.google.com/file/d/1wXRAfG2Os-Kbt9WtR1W2ET0YSC9HRoaf/view?usp=sharing", label: "Resume" },
];

const navLinks: { href: string; label: string; internal: boolean }[] = [
  { href: "/#projects", label: "Work", internal: true },
  { href: "/about", label: "About", internal: true },
  { href: "https://drive.google.com/file/d/1wXRAfG2Os-Kbt9WtR1W2ET0YSC9HRoaf/view?usp=sharing", label: "Resume", internal: false },
  { href: "mailto:niharikap0210@gmail.com", label: "Contact", internal: false },
];

const isHttp = (href: string) => href.startsWith("http");

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        {/* brand + nav */}
        <div className="site-footer-top">
          <Link to="/" className="site-footer-brand" aria-label="Niharika Pundlik — home">
            <span className="site-footer-logo">NP</span>
            <span className="site-footer-name">Niharika Pundlik</span>
          </Link>
          <nav className="site-footer-nav" aria-label="Footer">
            {navLinks.map((l) =>
              l.internal ? (
                <Link key={l.label} to={l.href} className="site-footer-link">{l.label}</Link>
              ) : (
                <a key={l.label} href={l.href} target={isHttp(l.href) ? "_blank" : undefined} rel={isHttp(l.href) ? "noopener noreferrer" : undefined} className="site-footer-link">{l.label}</a>
              )
            )}
          </nav>
        </div>

        {/* copyright + socials + back to top */}
        <div className="site-footer-bottom">
          <span className="site-footer-copy">© 2026 Niharika Pundlik · Product Designer, architect by training</span>
          <div className="site-footer-bottom-right">
            <div className="site-footer-socials">
              {socials.map((s) => {
                const Ico = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={isHttp(s.href) ? "_blank" : undefined}
                    rel={isHttp(s.href) ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="site-footer-social"
                  >
                    <Ico size={18} weight="regular" aria-hidden />
                  </a>
                );
              })}
            </div>
            <button className="site-footer-toptop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back to top <ArrowUp size={14} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
