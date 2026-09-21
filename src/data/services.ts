// Generated from the pre-migration index.html. 49 services across 8 tabs.
export type Provider = "Alexandra" | "Steffany" | "Both"

export interface Service {
  name: string
  note?: string
  price: string
  by: Provider
}

export interface ServiceTab {
  id: string
  label: string
  items: Service[]
}

export const SERVICE_TABS: ServiceTab[] = [
  {
    id: "facials",
    label: "Facials",
    items: [
      { name: "Signature Facial", note: "Double cleanse · exfoliation · extractions · mask · neck & arm massage", price: "$100", by: "Alexandra" },
      { name: "Acne Facial", note: "Cleanse · exfoliation · extractions · calming finish", price: "$100", by: "Both" },
      { name: "Teen Facial", note: "Gentle cleanse · safe exfoliation · pore care", price: "$90", by: "Both" },
      { name: "Microdermabrasion", note: "Anti-aging resurfacing · tone · fine lines", price: "$110", by: "Alexandra" },
      { name: "Chemical Peel", note: "Exfoliation · pigmentation · renewal", price: "$130", by: "Alexandra" },
      { name: "Microneedling", note: "Collagen · texture · scars", price: "$170", by: "Alexandra" },
    ],
  },
  {
    id: "brows",
    label: "Brows",
    items: [
      { name: "Signature Brow Wax", note: "Mapping · wax · tint", price: "$25", by: "Alexandra" },
      { name: "Brow Wax + Tint", note: "Mapping · wax · shape", price: "$30", by: "Alexandra" },
      { name: "Men's Signature Brows", price: "$25", by: "Both" },
      { name: "Brow Tint", price: "$10", by: "Both" },
      { name: "Brow Lamination", note: "Shaping · wax · optional tint", price: "$80", by: "Both" },
      { name: "Brow Lamination + Tint", price: "$90", by: "Both" },
    ],
  },
  {
    id: "lashlift",
    label: "Lash & Lifting",
    items: [
      { name: "Regular Lash Lift", price: "$70", by: "Both" },
      { name: "Korean Lash Lift", note: "Upward curl · includes tint", price: "$80", by: "Alexandra" },
      { name: "Korean Lash Lift + Tint", price: "$90", by: "Both" },
    ],
  },
  {
    id: "lashext",
    label: "Lash Extensions",
    items: [
      { name: "Classic Set", note: "Natural look", price: "$90", by: "Steffany" },
      { name: "Hybrid Set", note: "Noticeable, not dramatic", price: "$105", by: "Steffany" },
      { name: "Volume Set", note: "Glam / sparse lashes", price: "$125", by: "Steffany" },
      { name: "Wispy Set", price: "$115", by: "Steffany" },
      { name: "Wet Set", price: "$110", by: "Both" },
      { name: "Anime Set", price: "$115", by: "Both" },
      { name: "Hawaiian Set", price: "$100", by: "Both" },
      { name: "Mega Volume Set", price: "$145", by: "Both" },
      { name: "Hybrid-Realistic", note: "Lift + extensions", price: "$110", by: "Both" },
      { name: "Lash Removal", price: "$20", by: "Both" },
    ],
  },
  {
    id: "refills",
    label: "Lash Refills",
    items: [
      { name: "Classic Refill", price: "$65", by: "Both" },
      { name: "Hybrid Refill", price: "$75", by: "Both" },
      { name: "Wet Refill", price: "$75", by: "Both" },
      { name: "Hawaiian Refill", price: "$75", by: "Both" },
      { name: "Wispy Refill", price: "$85", by: "Both" },
      { name: "Anime Refill", price: "$85", by: "Both" },
      { name: "Volume Refill", price: "$95", by: "Both" },
      { name: "Mega Volume Refill", price: "$115", by: "Both" },
    ],
  },
  {
    id: "lymph",
    label: "Lymphatic",
    items: [
      { name: "Lymphatic Massage (Regular)", note: "1 hr · massage + dry brushing", price: "$120", by: "Both" },
      { name: "Whole Body Drainage", note: "2 hr · dry brush, sauna blanket, massage, scrub, wrap", price: "$230", by: "Both" },
      { name: "Monthly Package", price: "$600", by: "Both" },
    ],
  },
  {
    id: "wax",
    label: "Waxing",
    items: [
      { name: "Underarm", price: "$18", by: "Alexandra" },
      { name: "Full Arm", price: "$25", by: "Alexandra" },
      { name: "Full Leg", price: "$35", by: "Alexandra" },
      { name: "Bikini", price: "$40", by: "Alexandra" },
      { name: "Brazilian", price: "$50", by: "Alexandra" },
    ],
  },
  {
    id: "pmu",
    label: "PMU & Packages",
    items: [
      { name: "Lip Blushing", note: "Semi-permanent lip tint · 2–3 yrs", price: "$300", by: "Both" },
      { name: "Microblading", note: "Hair-stroke brows", price: "$300", by: "Both" },
      { name: "Powder Brows", note: "Soft shaded brows", price: "$300", by: "Both" },
      { name: "PMU Touch Up", price: "$150", by: "Both" },
      { name: "The Divine Duo", note: "Lash Lift + Brow Lamination", price: "$135", by: "Both" },
      { name: "Eyes on You", note: "Lash Extensions + Signature Brow Wax", price: "$135", by: "Both" },
      { name: "Fall Glow Package", note: "Signature Facial + Korean Lash Lift + Brow Wax/Tint", price: "$180", by: "Alexandra" },
      { name: "Hello Fall", note: "Any full set + Brow Lamination", price: "$160", by: "Both" },
    ],
  },
]
