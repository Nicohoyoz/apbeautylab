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

export const GOLDIE_URL =
  "https://book.heygoldie.com/DivineDaughtersStudio-251c1bf1fa75"
export const BOOK_ALEXANDRA_URL = `${GOLDIE_URL}/checkout?preferredStaffId=11457440-89cb-4d1e-8518-671f392e6fbf`
export const BOOK_STEFFANY_URL = `${GOLDIE_URL}/checkout?preferredStaffId=a9162bba-0ece-4cb1-b8e1-de8c64ad3ca0`

export const ADDRESS_LINES = ["14 Columbus Ave", "Belleville, NJ 07109"]
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=14+Columbus+Ave%2C+Belleville%2C+NJ+07109"

export const HOURS: string[] = [
  "Mon – Thu · 9:30 AM – 7:00 PM",
  "Fri · 9:30 AM – 5:00 PM",
  "Sat · 10:00 AM – 7:00 PM",
  "Sun · Closed",
]

export const BOOKING_DETAILS: string[] = [
  "Monday – Thursday · 9:30 AM – 7:00 PM",
  "Friday · 9:30 AM – 5:00 PM",
  "Saturday · 10:00 AM – 7:00 PM",
  "Sunday · Closed",
  "14 Columbus Ave, Belleville, NJ 07109",
  "Bilingual. English and Spanish.",
  "Arrive 5 minutes early",
  "24-hour cancellation notice required",
]

export const ABOUT_STATS: { num: string; label: string }[] = [
  { num: "3+", label: "Years experience" },
  { num: "2", label: "Languages" },
  { num: "2023", label: "Licensed since" },
]

export const FOOTER_LINKS: (NavLink & { external?: boolean })[] = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: INSTAGRAM_URL, label: "Instagram", external: true },
  { href: TIKTOK_URL, label: "TikTok", external: true },
]
