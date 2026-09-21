import { Cursor } from "@/components/Cursor"
import { Nav } from "@/components/Nav"
import { Services } from "@/components/Services"
import { Gallery } from "@/components/Gallery"
import { Ticker } from "@/components/Ticker"
import {
  useMagnetic,
  useMotionGate,
  useReveals,
  useSmoothScroll,
} from "@/hooks/useMotion"

/**
 * App shell. Services and gallery are migrated; the remaining sections
 * (#home, #booking, #about, #contact, #newsletter) still live in
 * src/legacy-reference.html and are yet to be ported. Nav links to those
 * anchors are inert until they exist.
 */
export default function App() {
  useSmoothScroll()
  useMotionGate()
  useReveals()
  useMagnetic("[data-magnetic]")

  return (
    <>
      <Cursor />
      <Nav />
      {/* Nav is fixed (~90px mobile / ~140px desktop); this stands in for the
          hero's own top spacing until #home is migrated. */}
      <main className="lg:pt-10">
        <Ticker />
        <Services />
        <Gallery />
      </main>
    </>
  )
}
