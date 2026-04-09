const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/niharika-pundlik-63a9a1288/" },
  { label: "Resume", href: "https://drive.google.com/file/d/1WbopauZ0xwmOnLNuEb1XZX5TmzxQCA6K/view?usp=sharing" },
];

export default function Footer() {
  return (
    <footer className="border-t mt-32" style={{ borderColor: "var(--ink-100)" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-ink-500">
          © {new Date().getFullYear()} Niharika Pundlik. All rights reserved.
        </p>
        <ul className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-500 hover:text-ink-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/40 rounded"
                style={{ transitionProperty: "color" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
