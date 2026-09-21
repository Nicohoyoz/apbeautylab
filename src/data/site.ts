// Site-wide links, carried over from the pre-migration nav and footer.
export interface NavLink {
  href: string
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#booking", label: "Book" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
  { href: "#newsletter", label: "Newsletter" },
]

export const INSTAGRAM_URL = "https://www.instagram.com/divinedaugthers.studio"
export const TIKTOK_URL = "https://www.tiktok.com/@divinedaugthers.studio"
