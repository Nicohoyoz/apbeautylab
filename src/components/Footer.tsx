import { FOOTER_LINKS } from "@/data/site"

export function Footer() {
  return (
    <footer
      data-cursor-invert
      className="grid grid-cols-1 items-center gap-6 bg-foreground px-6 py-12 text-center lg:grid-cols-[1fr_auto_1fr] lg:px-24 lg:text-left">
      <span className="font-display text-[1.1rem] font-extrabold uppercase tracking-[-0.03em] text-primary-foreground">
        Divine Daughters Studio
      </span>
      <span className="type-small text-primary-foreground/30 lg:text-center">
        &copy; 2026 Divine Daughters Studio &middot; Belleville, NJ
      </span>
      <ul className="flex list-none flex-wrap items-center justify-center gap-6 lg:justify-end">
        {FOOTER_LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="type-overline text-primary-foreground/50 no-underline transition-colors hover:text-primary-foreground"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
