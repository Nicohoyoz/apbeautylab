import { Cursor } from "@/components/Cursor"
import { Nav } from "@/components/Nav"
import { Gallery } from "@/components/Gallery"
import { useMotionGate, useReveals, useSmoothScroll } from "@/hooks/useMotion"

/**
 * App shell. Only the gallery has been migrated so far; the remaining sections
 * (#home, #services, #booking, #about, #contact, #newsletter) still live in
 * src/legacy-reference.html and are yet to be ported. Nav links to those
 * anchors are inert until they exist.
 */
export default function App() {
  useSmoothScroll()
  useMotionGate()
  useReveals()

  return (
    <>
      <Cursor />
      <Nav />
      {/* Nav is fixed (~90px mobile / ~140px desktop); this stands in for the
          hero's own top spacing until #home is migrated. */}
      <main className="lg:pt-10">
        <Gallery />
      </main>
    </>
  )
}
