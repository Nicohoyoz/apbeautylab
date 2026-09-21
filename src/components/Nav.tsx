import { useEffect, useState } from "react"
import { INSTAGRAM_URL, TIKTOK_URL, NAV_LINKS } from "@/data/site"
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/Button"

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const cur = window.scrollY
      if (!menuOpen) setHidden(cur > last && cur > 80)
      last = cur
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] flex flex-col border-b border-border bg-background/95 backdrop-blur-xl transition-transform duration-[400ms] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="relative flex items-center justify-between border-b border-border/60 px-6 py-5 lg:px-12">
          <div className="w-[120px]" />
          <a
            href="#home"
            className="nav-logo absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap font-display text-[0.8rem] font-extrabold uppercase tracking-[-0.03em] text-foreground no-underline sm:text-[0.95rem] lg:text-[1.25rem]"
          >
            <img
              src="/images/logo.png"
              alt=""
              className="hidden h-[22px] w-auto shrink-0 sm:block lg:h-[30px]"
            />
            Divine Daughters Studio
          </a>
          <div className="ml-auto flex items-center gap-6">
            <Button href="#booking" variant="primary" size="md" className="hidden lg:inline-flex">
              Book a Session
            </Button>
          </div>
        </div>

        <ul className="hidden list-none items-center justify-center gap-10 px-12 py-3 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="type-overline group relative whitespace-nowrap text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-2 border-t border-border/40 py-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Divine Daughters Studio on Instagram"
            className="type-overline flex items-center gap-2 text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            <InstagramIcon className="h-3 w-3" />
            @divinedaugthers.studio
          </a>
          <span className="type-small mx-2 text-border">&middot;</span>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Divine Daughters Studio on TikTok"
            className="type-overline flex items-center gap-2 text-muted-foreground no-underline transition-colors hover:text-foreground"
          >
            <TikTokIcon className="h-3 w-3" />
            TikTok
          </a>
        </div>
      </nav>

      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="fixed right-6 top-4 z-[200] flex flex-col gap-[5px] border-none bg-transparent p-1.5 lg:hidden"
      >
        <span className={`block h-px w-[22px] bg-foreground transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
        <span className={`block h-px w-[22px] bg-foreground transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block h-px w-[22px] bg-foreground transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
      </button>

      <div
        className={`fixed inset-0 z-[150] flex-col items-center justify-center gap-10 bg-background transition-all duration-300 ${
          menuOpen ? "flex opacity-100" : "pointer-events-none hidden opacity-0"
        }`}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="type-h1 text-foreground no-underline transition-colors hover:text-primary"
          >
            {l.label}
          </a>
        ))}
        <Button
          href="#booking"
          variant="outline"
          size="lg"
          className="mt-4"
          onClick={() => setMenuOpen(false)}
        >
          Book a Session
        </Button>
      </div>
    </>
  )
}
