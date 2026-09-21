import { useEffect, useState } from "react"
import { INSTAGRAM_URL, TIKTOK_URL, NAV_LINKS } from "@/data/site"
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons"

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
        className={`fixed inset-x-0 top-0 z-[100] flex flex-col border-b border-stone/25 bg-paper/95 backdrop-blur-xl transition-transform duration-[400ms] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="relative flex items-center justify-between border-b border-stone/15 px-6 py-5 lg:px-12">
          <div className="w-[120px]" />
          <a
            href="#home"
            className="nav-logo absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap font-serif text-[0.72rem] font-bold uppercase tracking-[0.08em] text-ink no-underline sm:text-[0.8rem] lg:text-[1.2rem] lg:tracking-[0.1em]"
          >
            <img
              src="/images/logo.png"
              alt=""
              className="hidden h-[22px] w-auto shrink-0 sm:block lg:h-[30px]"
            />
            Divine Daughters Studio
          </a>
          <div className="ml-auto flex items-center gap-6">
            <a
              href="#booking"
              className="nav-book hidden whitespace-nowrap bg-ink px-6 py-3 text-[0.6rem] uppercase tracking-[0.24em] text-paper no-underline transition-colors hover:bg-bark lg:inline-block"
            >
              Book a Session
            </a>
          </div>
        </div>

        <ul className="hidden list-none items-center justify-center gap-10 px-12 py-3 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative whitespace-nowrap text-[0.62rem] uppercase tracking-[0.2em] text-taupe no-underline transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-2 border-t border-stone/10 py-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Divine Daughters Studio on Instagram"
            className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.18em] text-taupe no-underline transition-colors hover:text-ink"
          >
            <InstagramIcon className="h-3 w-3" />
            @divinedaugthers.studio
          </a>
          <span className="mx-2 text-[0.7rem] text-warm">&middot;</span>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Divine Daughters Studio on TikTok"
            className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.18em] text-taupe no-underline transition-colors hover:text-ink"
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
        <span className={`block h-px w-[22px] bg-ink transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
        <span className={`block h-px w-[22px] bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block h-px w-[22px] bg-ink transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
      </button>

      <div
        className={`fixed inset-0 z-[150] flex-col items-center justify-center gap-10 bg-paper transition-all duration-300 ${
          menuOpen ? "flex opacity-100" : "pointer-events-none hidden opacity-0"
        }`}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-[clamp(2rem,7vw,3rem)] text-ink no-underline transition-colors hover:text-bark"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#booking"
          onClick={() => setMenuOpen(false)}
          className="mt-4 border border-ink px-10 py-4 text-[0.62rem] uppercase tracking-[0.26em] text-ink no-underline transition-colors hover:bg-ink hover:text-paper"
        >
          Book a Session
        </a>
      </div>
    </>
  )
}
